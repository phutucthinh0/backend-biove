const mongoose = require('mongoose');
const { Schema } = mongoose;
const communitySchema = new Schema({
    "name": String,
    "created": Number,
    "ranking": Number,
    "email": {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    "phone":{
        type: String,
        lowercase: true,
        required: true
    },
    "password": String,
    "userID": [],
    "campaigns": [],
    "description": String,
    "stories": [],
    "totalMoney": Number,
    "totalTree": Number,
    "avatar":String
})
module.exports = mongoose.model('Community',communitySchema,"communities");