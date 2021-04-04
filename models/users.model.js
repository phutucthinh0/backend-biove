const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    "name": String,
    "yearOfBirth": Number,
    "address": String,
    "ranking": Number,
    "email": {
        type: String,
        unique: true,
        lowercase: true,    
        trim: true,
        required: true
    },
    "password": String,
    "avatar": String,
    "campaigns": String,
    "community": String,
    "friends": String,
    "total": Number,
    "trackList": ""
})
module.exports = mongoose.model('User',userSchema,"users");