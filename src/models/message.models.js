import { model, Schema } from "mongoose"

const MessageSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique:false
    }
}, { timestamps: true })

export const messageModel = model("message", MessageSchema)