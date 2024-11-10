const voter = require("../models/voter");
const result = require("../models/results");
const election = require("../models/election");
const path = require("path");
const fs = require("fs");
require("../config/dbConnection");

exports.postRegisterPage =  async (req, res) =>{
  console.log(req.body.name);
    try {
      const { name, password, email, age, address } = req.body;


      // Save the descriptor and other user data to the database
      const newVoter = new Voter({
          name,
          email,
          age,
          address,
          password, // Be sure to hash in production! // Save the descriptor array
          createdAt: new Date(),
      });
      await newVoter.save();

      res.redirect("/voter/login");
    // Load the image with face-api.js
  } catch (err) {
    console.error("Error registering user:", err);
  }
};
exports.getLoginPage = (req, res) => {
  res.render("voter/login");
};
// exports.voterLogout = (req, res) => {
//
//   req.session.userAuth = false;
//   res.redirect("voter/login");
// };
exports.getRegisterPage = (req, res) => {
  res.render("voter/register");
};
// Example user data
// Call the function to register the user

exports.postLoginPage = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await voter.findOne({ email });

    if (!user) {
      return res.redirect("/voter/login");
    }

    if (user.password == password && user.registered) {
      req.session.user = user;
      req.session.userAuth = true;
      res.redirect("/voter/home");
    } else {
      res.redirect("/voter/login");
    }
  } catch (error) {
    console.log(error);
    res.render("errors/error", console.log(error));
  }
};
exports.getResultsPage = async (req, res, next) => {
  const results = await result.find({ isFinished: true }).lean();
  res.render("voter/results", {
    results: results,
  });
};
exports.getHomePage = async (req, res, next) => {
  const activeElections = await election.findOne({ isActive: true }).lean();
  const upcomingElections = await election.find({ isFinished: false }).lean();
  const user = req.session.user;
  res.render("voter/home", {
    userDetails: user,
    activeElections,
    upcomingElections,
  });
};

exports.postLogout = (req, res, next) => {
  req.session.userAuth = false;
  req.session.user = null;
  console.log("Logout....", req.session);

  res.redirect("/voter/login");
};
exports.getVotingPage = async (req, res, next) => {
  try {
    const electionActive = await election.findOne({ isActive: true }).lean();
    const candidates = electionActive.candidates.map((candidate, index) => ({
      id: index,
      name: candidate.name,
      party: candidate.party,
    }));
    console.log(candidates);
    res.render("voter/votingPage", { candidates: candidates });
  } catch {
    console.error("Error");
  }
};
