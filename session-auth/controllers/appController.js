const bycrypt = require('bcryptjs')
const appModel = require('../models/appModel')

exports.get_index=(req,res)=>{

}

exports.get_login=(req,res)=>{
    
}

exports.get_register=(req,res)=>{
    
}

exports.post_login=(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    appModel.findUser(email,(err,row)=>{
        if(err){
            res.status(500).send(err);
        }else{
            bycrypt.compare(password,row.password,(err,result)=>{
                if(result){
                    req.session.isAuth = true;
                    req.session.userEmail = email;
                    res.status(200).send(row);   
                }
            });
        }
    })
}

exports.post_register=(req,res)=>{
    const email = req.body.email
    appModel.findUser(email,(error,result)=>{
        if(error){
            res.status(500).send({error});
        }
        if(result!=undefined){
            res.status(401).send({'msg':"user already exists"})
        }else{
            bycrypt.hash(req.body.password, 10,(err,hash)=>{
                if(err){
                    res.status(500).send({error});
                }else{
                    appModel.registerUser(email,hash,(err,result)=>{
                        if(err){
                            res.status(500).send(err);
                        }else{
                            res.status(200).send({result});
                        }
                    })
                }
            })
        }
    })
}

exports.get_books=(req,res)=>{
    res.status(200).send({'books':[1,2,3,4,5,5]});
}