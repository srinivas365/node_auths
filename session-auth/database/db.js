const sqlite3 = require('sqlite3')

const db_path = "/home/mannem/projects/node_auths/session-auth/database/users"

const database = new sqlite3.Database(db_path,sqlite3.OPEN_READWRITE,err=>{
    if(err){
        console.log(err);
    }else{
        console.log('succesfully connected to db');
    }
});

module.exports = database