import { Schema, model } from "mongoose";
const productSchema = new Schema({
    title: { type: String, required: true, minlength: 10, trim: true },
    description: { type: String, required: true, minlength: 10, trim: true },
    images: [{ url: String, altText: String }],
    thumbnail: String,
    isPublished: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    reviews: [
        {
            name: { type: String, required: true },
            comment: String,
            email: String,
            approved: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0, min: 0, max: 10 },
    stock: { type: Number, required: true },
    status: { type: String, enum: ["in stock", "out of stock", "limited stock"], default: "in stock" },
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: "category" },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });

export const productModal = model("product", productSchema)
