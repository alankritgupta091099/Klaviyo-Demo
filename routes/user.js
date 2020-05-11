const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
let config = require('../config');

const User = require('../models/user.js');

router.post('/register',(req,res)=>{
    const today= Date.now();
    const userData={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        created:today
    }
    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                userData.password=hash;
                User.create(userData)
                .then(user=>{
                    res.json({status:user.email+' registered!'})
                })
                .catch(err=>{
                    res.json({error: err})
                })
            })
        }else{
            res.json({error:'User already exists'});
        }
    })
    .catch(err=>{
        res.send('error: '+err);
    })
})

router.post('/login',(req,res)=>{
    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload = {
                    _id:user.id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    email:user.email
                }
                let token = jwt.sign(payload, config.SECRET_KEY)
                res.header('x-auth-token',token).status(200).send()
                //res.send(token);
            }
            else{
                res.json({error:'Invalid Password'})
            }
        }
        else{
            res.json({error:'User Does not exist'})
        }
    })
    .catch(err=>{
        res.send('error'+err)
    })
})

module.exports=router;