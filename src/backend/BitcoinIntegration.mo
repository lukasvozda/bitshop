import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Nat64 "mo:base/Nat64";
import Iter "mo:base/Iter";

import BitcoinTypes "mo:bitcoin/bitcoin/Types";
import BitcoinApi "bitcoin-api/BitcoinApi";
import BitcoinApiUtils "bitcoin-api/Utils";
import BitcoinApiTypes "bitcoin-api/Types";

import Config "config";

import Payments "./payments";

module {
  // Bitcoin Types
  type GetUtxosResponse = BitcoinApiTypes.GetUtxosResponse;
  type MillisatoshiPerByte = BitcoinApiTypes.MillisatoshiPerByte;
  type SendRequest = BitcoinApiTypes.SendRequest;
  type Network = BitcoinApiTypes.Network;
  type BitcoinAddress = BitcoinApiTypes.BitcoinAddress;
  type Satoshi = BitcoinApiTypes.Satoshi;

  /// Returns the balance of the given Bitcoin address.
  public func get_balance(address : BitcoinAddress) : async Satoshi {
    await BitcoinApi.get_balance(Config.config.network, address);
  };

  /// Returns the UTXOs of the given Bitcoin address.
  public func get_utxos(address : BitcoinAddress) : async GetUtxosResponse {
    await BitcoinApi.get_utxos(Config.config.network, address);
  };

  /// Returns the 100 fee percentiles measured in millisatoshi/byte.
  /// Percentiles are computed from the last 10,000 transactions (if available).
  public func get_current_fee_percentiles() : async [MillisatoshiPerByte] {
    await BitcoinApi.get_current_fee_percentiles(Config.config.network);
  };

  private func parse_transaction_id(transactionId : Blob) : Text {
    BitcoinApiUtils.bytesToText(Array.reverse(Blob.toArray(transactionId)));
  };

  public func check_if_transaction_is_confirmed(address : BitcoinAddress, transactionIdToCheck : Text) : async Bool {
    let utxoResponse = await get_utxos(address);
    for (utxo in utxoResponse.utxos.vals()) {
      let transactionId = parse_transaction_id(utxo.outpoint.txid);
      if (transactionId == transactionIdToCheck) {
        return true;
      };
    };
    return false;
  };

  public func get_balance_of_transaction(address : BitcoinAddress, transactionIdToCheck : Text) : async Satoshi {
    let utxoResponse = await get_utxos(address);
    for (utxo in utxoResponse.utxos.vals()) {
      let transactionId = parse_transaction_id(utxo.outpoint.txid);
      if (transactionId == transactionIdToCheck) {
        return utxo.value;
      };
    };
    return 0;
  };

  public func get_total_balance(ownerExtendedPublicKeyBase58Check : Text, currentChildKeyIndex : Nat) : async Satoshi {
    var totalBalance : Satoshi = 0;
    if (ownerExtendedPublicKeyBase58Check == "") {
      return totalBalance;
    };
    for (i in Iter.range(0, currentChildKeyIndex)) {
      switch (Payments.parse(ownerExtendedPublicKeyBase58Check, Config.config.network)) {
        case null totalBalance += 0;
        case (?parsedPublicKey) {
          switch (parsedPublicKey.derivePath(Payments.getRelativePath(0))) {
            case null totalBalance += 0;
            case (?derivedFirstNonHardenedChild) {
              switch (derivedFirstNonHardenedChild.derivePath(Payments.getRelativePath(i))) {
                case null totalBalance += 0;
                case (?derived) {
                  let address : Text = Payments.getP2PKHAddress(derived.key, Config.config.network);
                  totalBalance += await get_balance(address);
                };
              };
            };
          };
        };
      };
    };
    return totalBalance;
  };
};
