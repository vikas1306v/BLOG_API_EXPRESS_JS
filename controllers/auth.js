const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
//importing the secret key from constant.js
const JWT_SECRET = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

//creating a post request for creating a user
router.post(
  "/create",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors return bad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    try{  
        const {name,email,password}=req.body;
        console.log(name,email,password)

        let user=  await User.findOne({
            email:email
         });
         if(user){
             return res.status(400).json({
                 error:"user already exists"
             })
         }
         const salt = await bcrypt.genSalt(10);
         const securePassword=await bcrypt.hash(password,salt); 
         user=await User.create({
            email:email,
            password:securePassword,
            name:name
         })
       const  token = jwt.sign({id:user.id},JWT_SECRET,{ expiresIn: "24h" }) ;
       res.json({success:true,token:token});
    }
    catch(error){
        
        res.status(500).send("Internal server error");

    }
  }
);

//creating a post request for login
router.post('/login',[body('email','should be correct').notEmpty(),
body('password','should be correct').notEmpty()
],async (req,res)=>{
   // if there are errors return bad request
   const result = validationResult(req);
   if (!result.isEmpty()) {
     return res.send({ errors: result.array() });
   }
    try{
      const {email,password}=req.body;
      let user=await User.findOne({email:email});
      if(!user){
          return res.status(400).json({
              error:"please try to login with correct credentials"
          })
      }
      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){{
          return res.status(400).json({

              error:"please try to login with correct credentials"
          })
      }}
      const token=jwt.sign({id:user.id},JWT_SECRET,{expiresIn:"24h"});
      res.json({success:true,token:token});

    }
    catch(error){
        res.status(500).send("Internal server error");
    }



});

//delete a user (delete request) login required
module.exports = router;
