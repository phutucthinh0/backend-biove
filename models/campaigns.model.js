const mongoose = require('mongoose');
const { Schema } = mongoose;
const campaignSchema = new Schema({
    "name": String,
    "address": String,
    "ranking":Number,
    "email": {
        type: String,
        lowercase: true,
        required: true
    },
    "phone":{
        type: String,
        lowercase: true,
        required: true
    },
    "community_id":{
        type: mongoose.ObjectId,
        lowercase: true,
        required: true
    },
    "tracker":[],
    "startDonate":Number,
    "endDonate":Number,
    "startPlanting":Number,
    "endPlanting":Number,
    "targetTrees":Number,
    "donated":Number,
    "targetMoney":Number,
    "invoice":[],
    "status":{
        type:String,
        enum:["ĐANG QUYÊN GÓP","ĐANG TRỒNG","THU HỒI"]
    }
})
module.exports = mongoose.model('Campaign',campaignSchema,"campaigns");