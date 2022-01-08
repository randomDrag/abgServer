const express = require("express");
const jwt = require("jsonwebtoken");
const AdminDB = require("../model/admin.model");
const adminjwtauth = require("../services/jwtverify");
const bcrypt = require('bcrypt')
let route = express.Router();

route.post("/register", (req, res) => {
    let { Email, Password } = req.body;
    let {id} = req.query;
    AdminDB.findOne({ Email: Email }, function (err, doc) {
      if (err) {
      } else {
        if (doc === null || doc === "") {
          bcrypt.hash(Password, 10, function (err, hash) {
            AdminDB.findOneAndUpdate(
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


  route.post("/login", async (req,res) => {



    try{
      //test
        let {Email , Password} = req.body;
    
    
        AdminDB.findOne({"Email" :Email},function(err,doc){
    
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


module.exports = route;