require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox")

const { PROVIDER_URL, PRIVATE_KEY } = process.env;


module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ensure this URL matches your Ganache RPC server
      accounts: ["0xc712aba4e1b066c4e2d429d89f3c6f98c22bb6e6a1967f83d865ff68b0075751"], // Replace with your Ganache account's private key
    },
  },
};