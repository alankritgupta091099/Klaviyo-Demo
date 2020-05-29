const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    segment:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{ minimize: false })

module.exports=mongoose.model('Segment',segmentSchema);