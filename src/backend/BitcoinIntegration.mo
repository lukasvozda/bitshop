import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Array "mo:base/Array";

import BitcoinTypes "motoko-bitcoin/src/bitcoin/Types";
import BitcoinApi "bitcoin-api/BitcoinApi";
import BitcoinApiUtils "bitcoin-api/Utils";
import BitcoinApiTypes "bitcoin-api/Types";

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
    await BitcoinApi.get_balance(#Regtest, address);
  };

  /// Returns the UTXOs of the given Bitcoin address.
  public func get_utxos(address : BitcoinAddress) : async GetUtxosResponse {
    await BitcoinApi.get_utxos(#Regtest, address);
  };

  /// Returns the 100 fee percentiles measured in millisatoshi/byte.
  /// Percentiles are computed from the last 10,000 transactions (if available).
  public func get_current_fee_percentiles() : async [MillisatoshiPerByte] {
    await BitcoinApi.get_current_fee_percentiles(#Regtest);
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
};
