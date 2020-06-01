const express = require('express')
const router = express.Router();

const List = require('../models/list.js')

router.post('/save',(req,res)=>{
    const newList = new List({
        user:req.body.user,
        list:req.body.list
    });

    List.findOne({"user._id":req.body.user._id,"list.list_id":req.body.list.list_id})
    .then(item=>{
        if(!item){
            newList
                .save()
                .then(item=>res.json("List Added"))
                .catch(err=>console.log(err))
        } else {
            List.findOneAndUpdate({"user._id":req.body.user._id,"list.list_id":req.body.list.list_id},{
                list:req.body.list
            },{ new: true ,  useFindAndModify: false })
                .then((item)=>{
                    res.status(200).json({msg:"List Updated"});
                })
                .catch(err=>{
                    res.status(404).json(`Error--${err}`);
                })
        }
    })    
})

router.get('/loadAll/:user_id', (req,res)=>{
    List.find({"user._id":req.params.user_id})
    .then(list=>{
        return res.status(200).json(list)
    })
    .catch(err=>{
        return res.status(404).json({msg:"Something Went Wrong"})
        //return null
    })
})

router.delete('/:user_id/deleteOne/:list_id', (req,res)=>{
    List.find({"user._id":req.params.user_id , "list.list_id":req.params.list_id}).deleteOne()
        .then(status=>{          
            if(status.deletedCount==1)
                return res.status(200).json({success:true})
            return res.status(404).json({success:false})
        })
        .catch(err=>res.status(404).json({success:false}));     
})

router.get('/:user_id/loadOne/:list_id', (req,res)=>{
    List.findOne({"user._id":req.params.user_id,"list.list_id":req.params.list_id})
        .then(list=>{
            return res.status(200).json(list)
        })
        .catch(err=>{
            return res.status(404).json({msg:"Not Found"})
        })
})

module.exports= router;