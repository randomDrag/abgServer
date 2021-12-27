const express = require("express");
const userDB = require("../model/User.model");
const adminjwtauth = require("../services/jwtverify");
const bcrypt = require("bcrypt");
let route = express.Router();

route.post("/register", (req, res) => {
  let { Email, Password } = req.body;
  let {id} = req.query;
  userDB.findOne({ Email: Email }, function (err, doc) {
    if (err) {
    } else {
      if (doc === null || doc === "") {
        bcrypt.hash(Password, 10, function (err, hash) {
          userDB.findOneAndUpdate(
            { _id: id },
            {
               
                Email,
                Password: hash,
              
            },
            (err, doc) => {
              if (err) {
                res.status(400).json(err);
              } else {
                res.status(200).json({ msg: true });
              }
            }
          );

          // const dat = new userDB({
          //     Email : Email,
          //     Password : hash
          // });

          //     dat.save(function (err, doc) {

          //         if (err) {
          //             res.status(400).json(err);
          //         } else {
          //             res.status(200).json({msg : true})
          //         }

          //     });
        });
      } else {
        res.status(200).json({ msg: false });
      }
    }
  });
});

module.exports = route;
