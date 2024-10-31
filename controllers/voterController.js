const voter = require("../models/voter");
require('../config/dbConnection')
const ethers = require('../config/ethers')

exports.getLoginPage = (req, res) => {
    res.render("voter/login");
};
// exports.voterLogout = (req, res) => {
//   req.session.user = null;
//   req.session.userAuth = false;
//   res.redirect("voter/login");
// };
exports.getRegisterPage = (req, res) => {
    res.render('voter/register')
}
// Example user data
// Call the function to register the user

exports.postRegisterPage = async (req, res) => {
  try {
    const newVoter = {
      name: req.body.name,
      password: req.body.password,  // Use a hashed password for production
      email: req.body.email,
      age : req.body.age,
      address : req.body.address,
      blockchainID : ethers.encodeBytes32String(req.body.password),
      votingDistrict : req.body.votingDistrict,
      registered : true,
      voted : false,
      createdAt : new Date()
    };
    const newUser = new voter(newVoter);
    const savedUser = await newUser.save();
    console.log('User registered with ID:', savedUser._id);
    res.redirect('/voter/login');  
  } catch (err) {
    console.error('Error registering user:', err);
  }
}


exports.postLoginPage = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await voter.findOne({ email });
      
      if (!user) {
        return res.redirect("/voter/login");
      }

      if (user.password == password) {
        req.session.user = user
        req.session.isAuth = true
        res.redirect('/voter/home')
      } 
    } catch (error) {
      console.log(error)
      res.render("errors/error", console.log(error));
    }
  };
  exports.getHomePage = async(req, res, next) => {
    const user = req.session.user;
    res.render('voter/home',  { userDetails : user })
  }

  exports.postLogout = (req,res,next) => {

    req.session.isAuth = false;
    console.log("------------> logout------->", req.session);
    
    res.redirect("/voter/login");
  }