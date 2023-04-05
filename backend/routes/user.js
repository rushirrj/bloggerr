const express = require('express')
const router = express.Router()
const User  =  require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup',async (req,res)=>{
    const{name,email,password,admin} = req.body
    if(!name || !email || !password || !admin){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with this email"})
        }
        //hashing password
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email:email,name:name,password:hashedpassword,admin:admin
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err);
            })
        })
  
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password } = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please Enter all the feilds"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
          return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"Successfully Signed In"})
                const token = jwt.sign({_id:savedUser._id,admin:savedUser.admin},JWT_SECRET)
                const {_id,name,email,admin} = savedUser
                res.json({token,User:{_id,name,email,admin}})
            }
            else{return res.status(422).json({error:"invalid email or password"})}
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router
