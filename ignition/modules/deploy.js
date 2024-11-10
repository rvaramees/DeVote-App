// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
require("../../config/dbConnection");
const election = require("../../models/election");

async function main() {
  const Voting = await ethers.getContractFactory("Voting");
  const electionStarted = await election.findOne({isActive : true}).select("candidates -_id").lean();
  const candidateNames = electionStarted.candidates.map(candidate => candidate.name);
  
  // Start deployment, returning a promise that resolves to a contract object
  const Voting_ = await Voting.deploy(candidateNames, 20);
  console.log("Contract address:", Voting_.address);
  

}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });
