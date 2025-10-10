import { Schema,model } from "mongoose";

const SartonixSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{timestamps:true});

export const SartonixModel = model("Sartonix", SartonixSchema);