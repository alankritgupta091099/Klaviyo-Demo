const express = require('express')
const router = express.Router();

const Segment = require('../models/segment.js')

router.post('/save',(req,res)=>{
    const newSegment = new Segment({
        user:req.body.user,
        segment:req.body.segment
    });

    Segment.findOne({"user._id":req.body.user._id,"segment.segment_id":req.body.segment.segment_id})
    .then(item=>{
        if(!item){
            newSegment
                .save()
                .then(item=>res.json("Segment Added"))
                .catch(err=>console.log(err))
        } else {
            Segment.findOneAndUpdate({"user._id":req.body.user._id,"segment.segment_id":req.body.segment.segment_id},{
                segment:req.body.segment
            },{ new: true ,  useFindAndModify: false })
                .then((item)=>{
                    res.status(200).json({msg:"Segment Updated"});
                })
                .catch(err=>{
                    res.status(404).json(`Error--${err}`);
                })
        }
    })    
})

router.get('/loadAll/:user_id', (req,res)=>{
    Segment.find({"user._id":req.params.user_id})
    .then(segment=>{
        return res.status(200).json(segment)
    })
    .catch(err=>{
        return res.status(404).json({msg:"Something Went Wrong"})
        //return null
    })
})

router.delete('/:user_id/deleteOne/:segment_id', (req,res)=>{
    Segment.find({"user._id":req.params.user_id , "segment.segment_id":req.params.segment_id}).deleteOne()
        .then(status=>{          
            if(status.deletedCount==1)
                return res.status(200).json({success:true})
            return res.status(404).json({success:false})
        })
        .catch(err=>res.status(404).json({success:false}));     
})

router.get('/:user_id/loadOne/:segment_id', (req,res)=>{
    Segment.findOne({"user._id":req.params.user_id,"segment.segment_id":req.params.segment_id})
        .then(segment=>{
            return res.status(200).json(segment)
        })
        .catch(err=>{
            return res.status(404).json({msg:"Not Found"})
        })
})

module.exports= router;