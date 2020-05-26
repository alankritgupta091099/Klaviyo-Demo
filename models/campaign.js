const mongoose = require ('mongoose');

const campaignSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    campaignList:{
        type:String
    },
    smartSending:{
        type:Boolean,
        default:true
    },
    campaign:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
},{ minimize: false });

module.exports = mongoose.model('Campaign', campaignSchema);