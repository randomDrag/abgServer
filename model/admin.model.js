const mongoose = require("mongoose");

let AdminSchema = mongoose.Schema({
  Email: {
    type: String,
   // required: true,
    unique: true,
  },
  Password: {
    type: String,
   // required: true,
  },

});

module.exports = mongoose.model('Admin', AdminSchema)