require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox")

const { PROVIDER_URL, PRIVATE_KEY } = process.env;


module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ensure this URL matches your Ganache RPC server
      accounts: ["0x0ccf62d81dd0d7912e81084d44e1ff02723b1996896dcd9b048072ec9905c188"], // Replace with your Ganache account's private key
    },
  },
};