var express = require('express');
var router = express.Router();

const { verifyAdminAuth } = require('../middleware/auth')
const adminController = require('../controllers/adminController')



router.get('/login', adminController.getLoginPage);
router.post('/login', adminController.postLoginPage);
router.get('/home' , verifyAdminAuth,adminController.getHomePage);
router.post('/logout', verifyAdminAuth,adminController.postLogout);
router.get('/manageVoters', verifyAdminAuth, adminController.manageVoters);
router.post('/manageVoters/:id', verifyAdminAuth, adminController.postRegisterVoter);
router.get('/addElection', verifyAdminAuth, adminController.getAddElection);
// router.get('/addCandidate', verifyAdminAuth, adminController.getAddCandidate);
// router.post('/addCandidate',verifyAdminAuth, adminController.postAddCandidate);
router.post('/viewCandidates', verifyAdminAuth, adminController.postViewCandidates);
router.post('/addElection', verifyAdminAuth, adminController.postAddElection);
router.post('/startElection', verifyAdminAuth, adminController.startElection);
router.get('/startElection', verifyAdminAuth, adminController.getElectionPage);
router.post('/postResults', verifyAdminAuth, adminController.postElectionResults);

module.exports = router;