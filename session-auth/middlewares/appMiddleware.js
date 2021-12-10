const check_auth = (req,res,next)=>{
    if(req.session.isAuth){
        next();
    }else{
        res.status(401).send({'msg':'Not Authorized'});
    }
}

module.exports = check_auth;

