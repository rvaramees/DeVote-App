require("dotenv").config();
const voter = require("../models/voter");
// const election = require('../models/election');
// const { getHomePage } = require('./voterController');
const { ethers } = require("hardhat");
const { abi } = require("../artifacts/contracts/Voting.sol/Voting.json");
const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  signer
);

require("../config/dbConnection");

exports.getAddCandidate = async (req, res, next) => {
  res.render("admin/addCandidates");
  // async function connectMetamask() {
  //   console.log("Metamaskin connecting...");
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  //   const signer = provider.getSigner();
  //   WALLET_CONNECTED = await signer.getAddress();
  // }
  // async function getDataInBlockchain() {
  //   console.log("Getting candidates");
  //   const candidates = await contractInstance.getAllVotesOfCandidates();
  //   console.log(candidates);
  // }
    // console.log("Getting..");
    // await connectMetamask();
    // try{const bool = await contractInstance.getVotingStatus();
    // console.log(bool);}
    // catch(err){
    //   console.log("Error getting status",err);
    // }
    // if (bool == true) {
    //   const candidates = await getDataInBlockchain();
    //   res.render("admin/addCandidates", {
    //     admin: req.session.admin,
    //     candidates: candidates,
    //   });
    // } else {
    //   res.send("Voting is finished");
    // }
};
exports.postViewCandidates = async(req, res, next) => {
  console.log("Getting candidates");
  const candidates = await contractInstance.getAllVotesOfCandidates();
  console.log(candidates);
  res.render('admin/viewCandidatePage',{candidates : candidates});
}
exports.postAddCandidate = async (req, res, next) => {
  const votingStatus = await contractInstance.getVotingStatus();
  console.log("Voting Status:", votingStatus);
  try {
    const vote = req.body.vote;
    console.log("Candidate name : ", vote);
    async function storeDataInBlockchain(vote) {
      console.log("Adding the candidate in voting contract...");
      // const gasLimit = 20000000;
      const tx = await contractInstance.addCandidate(vote);
      // const tx = await contractInstance.addCandidate(vote);
      await tx.wait();
      const candidates = await contractInstance.getAllVotesOfCandidates();
      console.log(candidates);
      console.log("Added");
    }
    const bool = await contractInstance.getVotingStatus();
    if (bool == true) {
      await storeDataInBlockchain(vote);
      res.send("The candidate has been registered in the smart contract");
    } else {
      res.send("Voting is finished");
    }
  } catch (err) {
    console.log("ERROR", err);
  }
};
exports.getLoginPage = (req, res) => {
  res.render("admin/login");
};
exports.postLoginPage = (req, res) => {
  const { email, password } = req.body;
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";
  if (email == adminEmail && password == adminPassword) {
    req.session.admin = adminEmail;
    req.session.adminAuth = true;
    res.redirect("/admin/home");
  } else {
    req.flash("error", "Invalid Email or Password");
    res.redirect("/admin/login");
  }
};
exports.getHomePage = (req, res, next) => {
  res.render("admin/home");
};
exports.postLogout = (req, res, next) => {
  req.session.adminAuth = false;
  req.session.admin = null;
  console.log("Admin logout...", req.session);
  res.redirect("/admin/login");
};
exports.manageVoters = async (req, res, next) => {
  const pendingRegistrations = await voter.find({ registered: false }).lean();
  res.render("admin/manageVoters", {
    admin: req.session.admin,
    voters: pendingRegistrations,
  });
};
exports.getAddElection = async (req, res, next) => {
  res.render("admin/addElection");
};
exports.postAddElection = async (req, res, next) => {
  try {
    const newElection = {
      title: req.body.title,
      description: req.body.description,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      candidates: req.body.candidate-name,  // Ensure candidates are in the correct format for your schema
    };
    
    const election = new Election(newElection);
    const savedElection = await election.save();
    console.log('Election added with ID:', savedElection._id);
    res.redirect('/admin/home');  // Redirect to an appropriate page
  } catch (err) {
    console.error('Error adding election:', err);
    res.status(500).send("Error adding election");
  }
};

exports.postAnnounceResults = async (req, res, next) => {
  const winner = req.body.data;
  // console.log(winner.name);
  // res.render('admin/showWinner', {winner : winner});
};