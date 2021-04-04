const mongoose = require('mongoose');
const { Schema } = mongoose;
const treeSchema = new Schema({
    "name": String,
    "description":String,
    "thumbnail":String,
    "total":Number,
    "campaign_id":String,
})
module.exports = mongoose.model('Tree',treeSchema,"trees");