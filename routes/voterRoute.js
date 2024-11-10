var express = require('express');
var router = express.Router();

const { verifyUserAuth, verifyAdminAuth } = require('../middleware/auth')
const voterController = require('../controllers/voterController')


router.get('/login', voterController.getLoginPage);
router.post('/login', voterController.postLoginPage)
router.get('/register', voterController.getRegisterPage);
router.post('/register',voterController.postRegisterPage);
router.get('/home', verifyUserAuth , voterController.getHomePage)
router.post('/logout', verifyUserAuth ,voterController.postLogout)
router.get('/votingPage', verifyUserAuth, voterController.getVotingPage)
router.get('/results', verifyUserAuth, voterController.getResultsPage);

// Route to handle photo upload


module.exports = router;