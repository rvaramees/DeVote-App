const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    electionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'elections', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    result : {
        type : String,
        required : true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});
const results = mongoose.model('Results', resultSchema);
module.exports = results;
