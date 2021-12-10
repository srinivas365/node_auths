const bcrypt = require('bcryptjs')

const validPassword = (password, hash)=>{
    console.log(password,hash);
    const result = new Promise((resolve,reject)=>{
        bcrypt.compare(password,hash,(err,result)=>{
            if(err) {
                console.log(err);
                reject(err)
            }else{
                console.log(result);
                resolve(result);
            }
        })
    });

    return result;
}

const genPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
  }

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;