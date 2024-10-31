const { getHomePage } = require('./voterController');

require('../config/dbConnection')

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