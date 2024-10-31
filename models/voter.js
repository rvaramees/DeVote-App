const mongoose = require('mongoose');
const { Schema } = mongoose;
const voterSchema = new Schema({
    // id : { type : String, required : true },  
    name : { type: String, required : true },  
    email : { type : String, required : true},
    password : { type : String, required : true},
    age : { type : Number, required : true},
    address : { type : String, required : true },
    // faceData : { type : String, required : true },
    blockchainID : { type : String, required : true },
    registered : { type : Boolean, required : true },
    voted : { type : Boolean, required : true }, 
    // publicKey : { type : String, required : true },
    votingDistrict : { type : String, required : true},
    createdAt : { type : String, required : true }
})
const voter = mongoose.model("voter", voterSchema)
module.exports = voter;

