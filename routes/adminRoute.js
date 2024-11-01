var express = require('express');
var router = express.Router();

const { verifyAdminAuth } = require('../middleware/auth')
const adminController = require('../controllers/adminController')


router.get('/login', adminController.getLoginPage);
router.post('/login', adminController.postLoginPage);
router.get('/home' , verifyAdminAuth,adminController.getHomePage);
router.post('/logout', verifyAdminAuth,adminController.postLogout);
router.post('/manageVoters', verifyAdminAuth, adminController.manageVoters);
router.post("/addCandidate", verifyAdminAuth,async (req, res) => {
    var vote = req.body.vote;
    console.log(vote)
    async function storeDataInBlockchain(vote) {
        console.log("Adding the candidate in voting contract...");
        const tx = await contractInstance.addCandidate(vote);
        await tx.wait();
    }
    const bool = await contractInstance.getVotingStatus();
    if (bool == true) {
        await storeDataInBlockchain(vote);
        res.send("The candidate has been registered in the smart contract");
    }
    else {
        res.send("Voting is finished");
    }
    });
module.exports = router;