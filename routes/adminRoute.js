var express = require('express');
var router = express.Router();

const { verifyAdminAuth } = require('../middleware/auth')
const adminController = require('../controllers/adminController')



router.get('/login', adminController.getLoginPage);
router.post('/login', adminController.postLoginPage);
router.get('/home' , verifyAdminAuth,adminController.getHomePage);
router.post('/logout', verifyAdminAuth,adminController.postLogout);
router.post('/manageVoters', verifyAdminAuth, adminController.manageVoters);
router.get('/addElection', verifyAdminAuth, adminController.getAddElection);
router.get('/addCandidate', verifyAdminAuth, adminController.getAddCandidate);
router.post('/addCandidate',verifyAdminAuth, adminController.postAddCandidate);

module.exports = router;