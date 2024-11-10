require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox")

const { PROVIDER_URL, PRIVATE_KEY } = process.env;


module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ensure this URL matches your Ganache RPC server
      accounts: ["0xd4272471757e75a037c935e55ac75672c7483b5926015556e2d0b4e1393eb6ad"], // Replace with your Ganache account's private key
    },
  },
};