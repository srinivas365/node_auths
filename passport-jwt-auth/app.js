const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const UserModel = require('./model/model');
require('./auth/auth')


mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@cluster0.ean5g.mongodb.net/rest_shop",{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>console.log('mongodb connected'))
        .catch(err=>console.log(err));

const routes = require('./routes/routes')
const secureroute = require('./routes/secureroutes')

const app = express()
app.use(passport.initialize());

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/user',routes);
app.use('/user', passport.authenticate('jwt',{session:false}), secureroute);

app.use((err,req,res,next)=>{
    res.status(err.status || 500).send({error:err});
})

app.listen(3000,()=>{
    console.log('server started');
})