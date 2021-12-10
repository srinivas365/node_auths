const mongoose = require('mongoose')
require('dotenv').config()

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const connection = mongoose.createConnection(process.env.DB_URL, mongoOptions)

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
})

const User = connection.model('User',UserSchema);

module.exports = connection;