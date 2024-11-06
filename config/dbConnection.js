const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Devote", {
    serverSelectionTimeoutMS: 30000 
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
