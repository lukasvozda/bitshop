import BitcoinApiTypes "bitcoin-api/Types";
// create constant for bitcoin network  (mainnet or testnet) in motoko

module {
  type Network = BitcoinApiTypes.Network;
  public type Config = {
    network : Network;
  };

  public let config : Config = {
    network = #Regtest;
  };
};
