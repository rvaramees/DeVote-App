var express = require('express');
var router = express.Router();

const { verifyUserAuth } = require('../middleware/auth')
const voterController = require('../controllers/voterController')


router.get('/login', voterController.getLoginPage);
router.post('/login', voterController.postLoginPage)
router.get('/register', voterController.getRegisterPage);
router.post('/register',voterController.postRegisterPage);
router.get('/home', verifyUserAuth , voterController.getHomePage)
router.post('/logout', verifyUserAuth ,voterController.postLogout)

module.exports = router;