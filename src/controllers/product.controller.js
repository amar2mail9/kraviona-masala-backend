
import slugify from "slugify";
import { productModal } from "../models/product.model.js";

// ======================= CREATE PRODUCT =======================
export const createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            images,
            thumbnail,
            price,
            discount,
            stock,
            status,
            category,
            subCategory,
            author
        } = req.body;

        if (!title || !description || !stock || !category) {
            return res.status(400).json({ success: false, message: "Required fields missing" });
        }

        const slug = slugify(title, { lower: true, strict: true });

        const existing = await productModal.findOne({ slug });
        if (existing) {
            return res.status(400).json({ success: false, message: "Slug already exists, try different title" });
        }

        const product = new productModal({
            title,
            description,
            images,
            thumbnail,
            price,
            discount,
            stock,
            status,
            category,
            subCategory,
            author,
            slug
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ======================= GET ALL PRODUCTS =======================