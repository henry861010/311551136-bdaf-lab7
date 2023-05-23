/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      forking: {
      	enabled: true,
        url: 'https://eth-mainnet.g.alchemy.com/v2/teUKazCmklsOrc8Q7fbicptGXe35JcPw',
        blockNumber: 17228670
      },
      chainId: 1,
    },
  },
};
