const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  Email: {
    type: String,
   // required: true,
    unique: true,
  },
  Password: {
    type: String,
   // required: true,
  },
  userInfo: {
    Name: {
      type: String,
    },
    Mobile_Number: {
      type: String,
    },
    Email : {
        type: String,
        required: true,
         unique: true,
    }
  }, status : {

    type : String

  },
  sms: [
    {
      id: mongoose.Types.ObjectId,
      Mobile_Number: {
        type: String,
      },
      Date: {
        type: String,
      },
      msg: {
        title: {
          type: String,
        },
        body: {
          type: String,
        },
      },
    },
  ],
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('user', userSchema)