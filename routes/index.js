var express = require('express');
const { handlebars } = require('hbs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('getStarted');
});

// // Route to render home page with voter data




module.exports = router;

