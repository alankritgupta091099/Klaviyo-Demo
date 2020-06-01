const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    list:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{ minimize: false })

module.exports=mongoose.model('List',listSchema);