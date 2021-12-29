const express = require("express");
const jwt = require("jsonwebtoken");
const userDB = require("../model/User.model");
const adminjwtauth = require("../services/jwtverify");
const bcrypt = require('bcrypt')
let route = express.Router();

route.post("/register", async (req, res) => {
  let { Name, Email, Number } = req.body;

  userDB.findOne({ "userInfo.Email": Email }, (err, doc) => {
    if (err) {
    } else {
      if (doc == null || doc === " ") {
        const dat = new userDB({
          userInfo: {
            Name,
            Email,
            Mobile_Number: Number,
          },
        });

        dat.save((err, doc) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json({ msg: true });
          }
        });
      } else {
        res.status(700).json({ msg: "already registered" });
      }
    }
  });
});

route.post("/login", async (req,res) => {



    try{
        let {Email , Password} = req.body;
    
    
         userDB.findOne({"Email" :Email},function(err,doc){
    
            if(err){
        
            
            }else{
               
                if(doc != null){
        
                    bcrypt.compare(Password, doc.Password, function(err, result) {
                        
                   if(err){
    
                   }else{
                       
                    if(result){
                         const token = jwt.sign({id : doc._id },process.env.JWT_SECRET,{expiresIn : '1y'});
                        
                         //  const t = token.split(".");
                          
                        //    const c1 = t[0] + "." + t[1];
                        //    const c2 = t[2];
                    
                        // console.log(token);
                     
                        res.status(200).json({msg : true , token});
                                             
                       }else{
                        res.status(200).json({msg :false});
                       }
                   }
        
        
                    
                });
                
                }else{
                    res.status(200).send("invalid password and name");
                }
              
            }
            
          });
        }catch(e){
            console.log(e);
            res.status(400).json({msg: e.massage});
        }
    
    




});



route.post("/newMassage",adminjwtauth, async (req, res) => {
  const { Mobile_Number, Date, body, title } = req.body;

  userDB.findOneAndUpdate(
    {
      _id: "61c8997a927d84b4bb9b9e63",
    },
    {
      $push: {
        sms: {
          Mobile_Number,
          Date,
          msg: {
            title,
            body,
          },
        },
      },
    },(err , doc)=>{

        if(err){
            res.status(400).json(err);

        }else{

            res.status(200).json({ msg: true });
        }




    }
  );
});


module.exports = route;
