
import {messageModel}  from "../models/message.models.js"
export const createMessage = async (req, res) => {
    try {
        const { email, message, name } = req.body

        if (!email || !name || !message) {
            return res.status(400).send({
                success: false,
                message: "Email, name, and message are all required."
            })
        }

        const newMessage = new messageModel({ name, message, email })
        await newMessage.save()
console.log(newMessage);

        return res.status(201).send({
            success: true,
            message: "Message sent successfully",
            newMessage
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const getAllMessage = async (req, res) => {
    try {
        const messages = await messageModel.find().sort({ createdAt: -1 })
        if (!messages.length) {
            return res.status(404).send({
                success: false,
                message: "No messages found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "All messages retrieved",
            messages
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
