const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const secret = process.env.JWT_SECRET_KEY
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,secret);
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message:'Auth failed'
        })
    }
}