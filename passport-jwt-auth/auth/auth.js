const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../model/model');



passport.use('signup', new localStrategy(
    {usernameField:'email',passwordField:'password'},
    async (email,password, done) =>{
        console.log(email);
        console.log(password);
        try {
            const user = await UserModel.create({email,password});
            return done(null, user);
        } catch (error) {
            console.log(error)
            done(error);
        }
    }
));

passport.use('login',new localStrategy(
    {usernameField:'email',passwordField:'password'},
    async (email, password, done)=>{
        try {
            const user = await UserModel.findOne({email})
            if(!user){
                return done(null,false,{message:'user not found'})
            }
            const validate = await user.isValidPassword(password);

            if(!validate){
                return done(null,false,{message:'Invalid password'})
            }

            return done(null, user, {message: 'Logged in successfully'})

        } catch (error) {
            return done(error);
        }
    })
)

passport.use(new JwtStrategy(
    {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
    },
    async (token,done)=>{
        try {
            return done(null, token.user);
        }catch(error){
            done(error);
        }
    }
));

