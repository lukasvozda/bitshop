import Common "mo:bitcoin/Common";
import Hmac "mo:bitcoin/Hmac";
import Hash "mo:bitcoin/Hash";
import Base58Check "mo:bitcoin/Base58Check";
import Curves "mo:bitcoin/ec/Curves";
import Jacobi "mo:bitcoin/ec/Jacobi";
import Affine "mo:bitcoin/ec/Affine";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Nat32 "mo:base/Nat32";

import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Types "mo:bitcoin/bitcoin/Types";
import Ripemd160 "mo:bitcoin/Ripemd160";
import SHA256 "mo:sha/SHA256";

module {

  public type GetParseError = {
    #Base58PubKeyWrongFormatError;
  };

  public type GetDerivationError = {
    #ChildKeyDerivationError;
    #Base58PubKeyWrongFormatError;
    #OwnerExtendedPubKeyNotSet;
  };

  let curve : Curves.Curve = Curves.secp256k1;

  func encodeVersion(network : Types.Network) : Nat8 {
    // https://en.bitcoin.it/wiki/List_of_address_prefixes
    return switch (network) {
      case (#Mainnet) {
        0x00; // mainnet
      };
      case (#Testnet or #Regtest) {
        0x6f; // testnet
      };
    };
  };

  func encodePublicPrefix(network : Types.Network) : Nat32 {
    return switch (network) {
      case (#Mainnet) {
        0x0488B21E; // mainnet,p2pkh or p2sh, xpub
      };
      case (#Testnet or #Regtest) {
        0x043587cf; // testnet, p2pkh or p2sh, tpub
      };
    };
  };
  // create relative derivation path of the non-hardened child public key
  public func getRelativePath(currentIndex : Nat) : Text {
    return "m/" # Nat.toText(currentIndex);
  };

  // gets P2PKH address from a public key in compressed form
  public func getP2PKHAddress(compressedPubKey : [Nat8], network : Types.Network) : Text {
    let ripemd160Hash : [Nat8] = Ripemd160.hash(SHA256.sha256(compressedPubKey));
    let versionedHash : [Nat8] = Array.tabulate<Nat8>(
      ripemd160Hash.size() + 1,
      func(i) {
        if (i == 0) {
          return encodeVersion(network);
        } else {
          ripemd160Hash[i - 1];
        };
      }
    );
    return Base58Check.encode(versionedHash);
  };
  // parse extended public key in Base58Check form
  public func parse(bip32Key : Text, network : Types.Network) : ?IndependentExtendedPublicKey {
    switch (Base58Check.decode(bip32Key)) {
      case (?b58Decoded) {
        let version : Nat32 = Common.readBE32(b58Decoded, 0);
        // Public key version must match desired network
        if (version != encodePublicPrefix(network)) {
          return null;
        };

        let depth : Nat8 = b58Decoded[4];
        let parent_fingerprint : [Nat8] = Array.tabulate<Nat8>(
          4,
          func(i) {
            b58Decoded[5 + i];
          }
        );
        let index : Nat32 = Common.readBE32(b58Decoded, 9);
        let chaincode = Array.tabulate<Nat8>(
          32,
          func(i) {
            b58Decoded[13 + i];
          }
        );

        // Public key must start with 0x02 or 0x03.
        if (b58Decoded[45] != 0x02 and b58Decoded[45] != 0x03) {
          return null;
        };

        let keyData = Array.tabulate<Nat8>(
          33,
          func(i) {
            b58Decoded[45 + i];
          }
        );

        return switch (Affine.fromBytes(keyData, curve)) {
          case (null) {
            return null;
          };
          case (?parsedPoint) {
            if (not Affine.isOnCurve(parsedPoint)) {
              return null;
            };
            ?IndependentExtendedPublicKey(keyData, chaincode, depth, index, parent_fingerprint);
          };
        };
      };
      case (null) {
        return null;
      };
    };
  };

  func isHardenedIndex(index : Nat32) : Bool {
    return index >= 0x80000000; // 2**31
  };

  // Parses a Text path in the form "m/a/b/c/..." for unsigned integers
  // a,b,c,... and returns an array [a, b, c, ...]. Parsing fails and returns
  // null if input is not in the expected format or if it contains hardened
  // indices (e.g., m/0/1').
  func arrayPathFromString(path : Text) : ?[Nat32] {
    // Initial size most suitable for single-digit indices
    let parsedPathBuffer : Buffer.Buffer<Nat32> = Buffer.Buffer(path.size() / 2);
    let sanitized : Text = Text.replace(
      path,
      #predicate(
        func(c) {
          c == '\n' or c == ' ' or c == '\r';
        }
      ),
      ""
    );
    let tokens : Iter.Iter<Text> = Text.tokens(sanitized, #char '/');
    var first : Bool = true;
    label tokensloop for (token in tokens) {
      if (token == "m") {
        if (first) {
          first := false;
          continue tokensloop;
        };
        return null;
      };
      // Find whether it is hardened
      if (Text.contains(token, #char '\'')) {
        return null;
      };

      switch (Common.textToNat(token)) {
        case (?number) {
          parsedPathBuffer.add(Nat32.fromNat(number));
          first := false;
        };
        case (null) {
          return null;
        };
      };
    };
    return ?parsedPathBuffer.toArray();
  };

  public class IndependentExtendedPublicKey(
    _key : [Nat8],
    _chaincode : [Nat8],
    _depth : Nat8,
    _index : Nat32,
    _parent_fingerprint : [Nat8]
  ) {

    public let key = _key;
    public let chaincode = _chaincode;
    public let depth = _depth;
    public let index = _index;
    public let parent_fingerprint = _parent_fingerprint;

    // Derive a child public key with path relative to this instance. Returns
    // null if path is #text and cannot be parsed.
    public func derivePath(path : Text) : ?IndependentExtendedPublicKey {
      return do ? {
        // Normalize the given path as an array of indices.
        let pathArray : ?[Nat32] = arrayPathFromString(path);
        switch (arrayPathFromString(path)) {
          case null return null;
          case (?pathArray) {
            var target : IndependentExtendedPublicKey = IndependentExtendedPublicKey(
              key,
              chaincode,
              depth,
              index,
              parent_fingerprint
            );

            // Derive the hierarchy of child keys.
            for (childIndex in pathArray.vals()) {
              target := target.deriveChild(childIndex)!;
            };
            target;
          };
        };
      };
    };

    // Derive child at the given index. Valid indices are in the range
    // [0, 2^31 - 1] and the function throws an error if given an index outside
    // this range.
    public func deriveChild(index : Nat32) : ?IndependentExtendedPublicKey {
      if (isHardenedIndex(index)) {
        return null;
      };

      // Compute HMAC with chaincode as the key and the serialized
      // parentPublicKey (33 bytes) concatenated with the serialized
      // index (4 bytes) as its data.
      let hmacData : [var Nat8] = Array.init<Nat8>(33 + 4, 0x00);
      Common.copy(hmacData, 0, key, 0, 33);
      Common.writeBE32(hmacData, 33, index);
      let hmacSha512 : Hmac.Hmac = Hmac.sha512(chaincode);
      hmacSha512.write(Array.freeze(hmacData));
      let fullNode : [Nat8] = hmacSha512.sum();

      // Split HMAC output into two 32-byte sequences.
      let left : [Nat8] = Array.tabulate<Nat8>(
        32,
        func(i) {
          fullNode[i];
        }
      );
      let right : [Nat8] = Array.tabulate<Nat8>(
        32,
        func(i) {
          fullNode[i + 32];
        }
      );

      // Parse the left 32-bytes as an integer in the domain parameters of
      // secp2secp256k1 curve.
      let multiplicand : Nat = Common.readBE256(left, 0);
      if (multiplicand >= curve.r) {
        // This has probability lower than 1 in 2^127.
        return null;
      };

      switch (Jacobi.fromBytes(key, curve)) {
        case (null) {
          return null;
        };
        case (?parsedKey) {
          // Derive the child public key.
          switch (Jacobi.add(Jacobi.mulBase(multiplicand, curve), parsedKey)) {
            case (#infinity(_)) {
              return null;
            };
            case (childPublicKey) {
              return ?IndependentExtendedPublicKey(
                Jacobi.toBytes(childPublicKey, true),
                right,
                depth + 1,
                index,
                parent_fingerprint
              );
            };
          };
        };
      };
    };

    public func serialize(network : Types.Network) : Text {
      let result = Array.init<Nat8>(78, 0);
      Common.writeBE32(result, 0, encodePublicPrefix(network));
      result[4] := depth;
      Common.copy(result, 5, parent_fingerprint, 0, 4);
      Common.writeBE32(result, 9, index);
      Common.copy(result, 13, chaincode, 0, 32);
      Common.copy(result, 45, key, 0, key.size());
      return Base58Check.encode(Array.freeze(result));
    };
  };
};
