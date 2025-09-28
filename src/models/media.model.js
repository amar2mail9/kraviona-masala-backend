import { Schema, model } from "mongoose";


const medialSchema = new Schema({

    userID: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    info: {
        type: Object
    }
}, { timestamps: true })

export const medialModel = model("media",medialSchema)