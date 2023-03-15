require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const private_keys = [
  process.env.PRIVATE_KEY_0,
  process.env.PRIVATE_KEY_1,
]


module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.11",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  },
  goerli: {
    provider: () => HDWalletProvider({
      privateKeys: private_keys,
      providerOrUrl: 'https://goerli.infura.io/v3/1a0f7169fe2b4938a9e30a6440a3e5e7',
    }),
    network_id: 5,
    gas: 4465030,
}
};
