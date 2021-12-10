
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')


const dbUrl = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.ean5g.mongodb.net/rest_shop"
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const mongoConnection = mongoose.createConnection(dbUrl,mongoOptions);
const MongoStore = require('connect-mongo')(session)


const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const sessionStore = new MongoStore({
    mongooseConnection: mongoConnection,
    collection : 'sessions'
})

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


app.get('/',(req,res,next)=>{
    res.status(200).send({'session':req.session});
})


app.listen(3000,()=>{
    console.log('listening at port 3000');
})