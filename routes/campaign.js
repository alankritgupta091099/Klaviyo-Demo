const express = require('express');
const router = express.Router();
const nodemailer=require('nodemailer')

const Campaign = require('../models/campaign');
const List = require('../models/list');
//const createMail= require('./campaign')

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
            Campaign.findOneAndUpdate({"user._id":req.body.user._id,"campaign.campaign_id":req.body.campaign.campaign_id},{
                campaign:req.body.campaign
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

router.post('/:user_id/sendMail/:campaign_id',async(req,res)=>{
    var emailArr=[];
    Campaign.findOne({"user._id":req.params.user_id,"campaign.campaign_id":req.params.campaign_id})
    .then(campaign=>{
        const { campaign_receivers_type , campaign_receivers_id , campaign_content } = campaign.campaign;

        if(campaign_receivers_type==='List'){
            List.findOne({'list.list_id':campaign_receivers_id})
            .then(item=>{
                emailArr=item.list.list_data;
                sendMail(emailArr,campaign_content)
                return res.status(200).json({msg:'Mail Sent'})
            })
            .catch(err=>{
                console.log(err)
                return res.status(404).json({msg:'List not found'});
            })
        } else {
            return res.json({msg:'Segment abhi bacha hai'})
        }
    })
    .catch(err=>{
        console.log(err)
        return res.status(404).json({msg:'Can not find Campaign'})
    })
})

let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

const sendMail=(email,data)=>{
    let mailOptions={
        from:process.env.EMAIL,
        to:email, 
        subject:data.subject, 
        html:data.email_html
    };
    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log("Can not send mail",err)
        } else {
            console.log("Mail sent")
        }
    });
}
module.exports = router;