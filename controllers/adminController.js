require ("dotenv").config();
const voter = require('../models/voter');
const { getHomePage } = require('./voterController');
const {ethers} = require('hardhat');
const {abi} = require('../artifacts/contracts/Voting.sol/Voting.json');
const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, signer);

require('../config/dbConnection')

exports.postAddCandidate = async (req, res, next) => {
  const votingStatus = await contractInstance.getVotingStatus();
  console.log("Voting Status:", votingStatus);  
  try{
      const vote = req.body.vote;
      console.log("Candidate name : ",vote);
      async function storeDataInBlockchain(vote) {
        console.log("Adding the candidate in voting contract...");
        const tx = await contractInstance.addCandidate(vote);
        await tx.wait();
        const candidates = await contractInstance.getAllVotesOfCandidates();
        console.log(candidates);
        console.log("Added");
    }
    const bool = await contractInstance.getVotingStatus();
    if (bool == true) {
        await storeDataInBlockchain(vote);
        res.send("The candidate has been registered in the smart contract");
    }
    else {
        res.send("Voting is finished");
    }
    res.redirect('/admin/addCandidates');}
    catch(err) {
      console.log("ERROR", err);
    }
  };
exports.getLoginPage = (req, res) => {
    res.render("admin/login");
};
exports.postLoginPage =  (req, res) => {
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
    res.render('admin/home');
}       
exports.postLogout = (req, res, next) => {
    req.session.adminAuth = false;
    req.session.admin = null;
    console.log("Admin logout...",req.session);
    res.redirect("/admin/login")
}
exports.manageVoters = async(req, res, next) => {
    const pendingRegistrations = await voter.find({registered : false}).lean();
    res.render("admin/manageVoters", {
      admin : req.session.admin,
      voters : pendingRegistrations,
    })
}
exports.getAddCandidate = async(req, res, next) => {
  res.render('admin/addCandidates');
}
exports.getAddElection = async(req, res, next) => {
  res.render('admin/addElection');
}
