const express = require('express');
const router = express.Router();

const Campaign = require('../models/campaign');

router.post('/save',(req,res)=>{
    const newCampaign = new Email({
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
            },{new:true})
                .then((item)=>{
                    res.status(200).json({msg:"Campaign Updated"});
                })
                .catch(err=>{
                    res.status(404).json(`Error--${err}`);
                })
        }
    })    
})

module.exports = router;