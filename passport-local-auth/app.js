const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const connection = require('./config/database')
const routes = require('./routes')

const MongoStore = require('connect-mongo')(session)
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: "sessions"
})

app.use(session({
    store: sessionStore,
    saveUninitialized:true,
    resave:false,
    secret: process.env.SECRET,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }

}))

require('./config/passport'); // <------------------------------------ your passport strategy
app.use(passport.initialize())
app.use(routes);
app.listen(3000,()=>{
    console.log('listening to port 3000');
})

