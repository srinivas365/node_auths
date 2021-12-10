const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

const app = express()

mongoose.connect("mongodb+srv://m001-student:"+process.env.MONGODB_ATLAS_PWD+"@cluster0.ean5g.mongodb.net/rest_shop",{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>console.log('mongodb connected'))
        .catch(err=>console.log(err));

app.use(express.json())
app.use('/users',userRoutes);



app.use((req,res,next)=>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;