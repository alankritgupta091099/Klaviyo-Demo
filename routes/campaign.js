const express = require('express');
const router = express.Router();

const Campaign = require('../models/campaign');

router.post('/save',(req,res)=>{
    const newCampaign = new Campaign({
        user:req.body.user,
        campaign:req.body.campaign
    });
    Campaign.findOne({"user._id":req.body.user._id,"campaign.campaign_id":req.body.campaign.campaign_id})
    .then(item=>{
        if(!item){
            newCampaign
                .save()
                .then(item=>res.json("Campaign Added"))
                .catch(err=>console.log(err))
        } else {
            newCampaign.findOneAndUpdate({"user._id":req.body.user._id,"campaign.campaign_id":req.body.campaign.campaign_id},{
                email:req.body.campaign
            },{ new: true ,  useFindAndModify: false })
                .then((item)=>{
                    res.status(200).json({msg:"Campaign Updated"});
                })
                .catch(err=>{
                    res.status(404).json(`Error--${err}`);
                })
        }
    })    
})
router.get('/loadAll/:user_id', (req,res)=>{
    Campaign.find({"user._id":req.params.user_id})
    .then(campaign=>{
        return res.status(200).json(campaign)
    })
    .catch(err=>{
        return res.status(404).json({msg:"Something Went Wrong"})
    })
})

router.delete('/:user_id/deleteOne/:campaign_id', (req,res)=>{
    Campaign.find({"user._id":req.params.user_id , "campaign.campaign_id":req.params.campaign_id}).deleteOne()
        .then(status=>{          
            if(status.deletedCount==1)
                return res.status(200).json({success:true})
            return res.status(404).json({success:false})
        })
        .catch(err=>res.status(404).json({success:false}));     
})

router.get('/:user_id/loadOne/:campaign_id', (req,res)=>{
    Campaign.findOne({"user._id":req.params.user_id,"campaign.campaign_id":req.params.campaign_id})
        .then(campaign=>{
            return res.status(200).json(campaign)
        })
        .catch(err=>{
            return res.status(404).json({msg:"Not Found"})
        })
})

module.exports = router;

module.exports = router;