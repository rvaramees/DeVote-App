require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox")

const { PROVIDER_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.11",
   network : {
    localganache: {
    url: "http://127.0.0.1:7545",
    chainId: "5777",
    accounts: [`0x${process.env.PRIVATE_KEY}`],
  },
}
}