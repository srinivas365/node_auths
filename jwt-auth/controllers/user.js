const bcrypt = require("bcryptjs");
const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

exports.login_user = (req,res)=>{
    User.find({email:req.body.email})
        .then(user=>{
            if(user.length < 1){
                return res.status(404).json({
                    message:'Auth failed'
                });
            }else{
                bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
                    if(err){
                        return res.status(404).json({
                            message:'Auth failed'
                        });
                    }

                    if(result)
                    {
                        console.log(result);
                        const token = jwt.sign({
                            email:user[0].email,
                            user_id:user[0]._id
                        }, process.env.JWT_SECRET_KEY)

                        return res.status(200).json({
                            message:'Auth success',
                            token:token
                        });
                    }

                    return res.status(404).json({
                        message:'Auth failed'
                    });
                })
            }
        })
}


exports.register_user = (req,res)=>{
    console.log(req.body.email);
    User.find({email:req.body.email})
        .then(user=>{
            if(user.length>=1){
                return res.status(409).send({
                    message:"user email doesn't exist"
                })
            }else{
                bcrypt.hash(req.body.password, saltRounds,(err,hash)=>{
                    if(err){
                        console.log(err);
                        return res.status(500).json({"error":err});
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email:req.body.email,
                            password:hash
                        })
                        user.save()
                            .then(result=>{
                                res.status(201).json({
                                    message:"User created",
                                    result:result
                                })
                            })
                            .catch((err)=>{
                                console.log(err);
                                res.status(500).json({error:err});
                            })
                    }
                });
            }
        })
}

exports.user_details=(req,res)=>{
    res.status(200).send(req.userData);
}