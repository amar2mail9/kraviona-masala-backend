import mongoose, { Schema, model } from "mongoose"
const subcategorySchema = new Schema({
    subcategoryName: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    image: {
        type: String,

    },
    description: {
        type: String
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


export const subcategoryModel = model("category", subcategorySchema)