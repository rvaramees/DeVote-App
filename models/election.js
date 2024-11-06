const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    candidates: [{ 
      name: { type: String, required: true },
      party : { type : String, required : true},
      voteCount: { type: Number, default: 0 }
    }],
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const election = mongoose.model('Election', electionSchema);
module.exports = election;