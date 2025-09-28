import { medialModel } from "../models/media.model.js";

const uploadImage = async (req,res)=>{
    try {
        const {userID,image,info}= red.file
        const user = await req.user

        if (!userID) return res.status(400).send({success:false,message:"Login again"});
        if (!image) return res.status(400).send({success:false,message:"Please upload image"})
     
        const newMedia = medialModel({
            image,info,userID:user.userID
        })
        await newMedia.save()

        return res.status(201).send({success:true,message:"image upload successfully"})
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.messages
        })
    }
}

const getAllMedia = async (req,res)=>{
    try {
        const userID = req.user
        const mediaes = await medialModel.find({userID})
        if (!mediaes) res.status(400).send({success:false,message:"try again"})

        if (mediaes.length ===0) {
           return res.status(200).send({
            success:true,
            message:"Empty media"
        }) 
        }

        return res.status(200).send({
            success:true,message:"Data founded",
            images:mediaes
        })
    } catch (error) {
       return res.status(500).send({
            success:false,
            message:error.messages
        })  
    }
}