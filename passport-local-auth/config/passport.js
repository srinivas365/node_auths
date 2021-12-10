const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;
const {validPassword} = require('../lib/passwordUtils');

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
}

const verifyCallback = async (username,password,done)=>{
    User.findOne({'email':username})
        .then(user=>{
            if(!user) { return done(null, false)}
            const userObj = JSON.parse(JSON.stringify(user))
            console.log(userObj);
            validPassword(password, userObj.password).then(isValid=>{
                console.log(isValid);
                if(isValid){
                    return done(null,user);
                }else{
                    return done(null, false, {'message':'something wrong'})
                }
            });
        }).catch(error=>{
            done(error); 
        });
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user)
    }).catch((error)=>{
        done(error);
    })
})

