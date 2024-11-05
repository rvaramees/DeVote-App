// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const electionSchema = new Schema({
//     // id : { type : String, required : true },  
//     name : { type: String, required : true },  
//     start_date : { type : datetime, required : true},
//     createdAt : { type : String, required : true }
// })
// const voter = mongoose.model("voter", voterSchema)
// module.exports = voter;

const { boolean } = require('hardhat/internal/core/params/argumentTypes');
const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    candidates: [{ 
      name: { type: String, required: true },
      voteCount: { type: Number, default: 0 }
    }],
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const election = mongoose.model('Election', electionSchema);
module.exports = election;