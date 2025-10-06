import  { Schema, model } from "mongoose"
const categorySchema = new Schema({
    categoryName: {
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
    author: { type: Schema.Types.ObjectId, ref: "User" },
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


export const categoryModel = model("category", categorySchema)