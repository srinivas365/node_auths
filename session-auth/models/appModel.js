const appDatabase = require('../database/db');

exports.findUser = (email,callback)=>{
    const sql = 'SELECT * from Users where Email=?';
    appDatabase.get(sql,[email],(error,row)=>{
        if(error){
            callback(error);
        }
        else{
            console.log(row);
            callback(null,row);
        }
    });
}

exports.registerUser = (email,password,callback)=>{
    const sql = 'INSERT INTO USERS (Email, Password) values (?,?)';
    appDatabase.run(sql,[email,password],(error,row)=>{
        if(error){
            callback(error.message)
        }else{
            console.log('user inserted');
            callback(null,'inserted');
        }
    })
}