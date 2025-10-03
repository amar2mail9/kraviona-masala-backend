
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
export const getAllProducts = async (req, res) => {
    try {
        let { page = 1, limit = 10, search, category, status } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const query = {};

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        if (category) {
            query.category = category;
        }

        if (status) {
            query.status = status;
        }

        const products = await productModal.find(query)
            .populate("category subCategory author", "name email")
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await productModal.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            products
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// ======================= GET SINGLE PRODUCT =======================
export const getSingleProduct = async (req, res) => {
    try {
        const { slug } = req.params;

        const product = await productModal.findOne({ slug })
            .populate("category subCategory author", "name email");

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// ======================= UPDATE PRODUCT =======================
export const updateProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        const updateData = req.body;

        if (updateData.title) {
            updateData.slug = slugify(updateData.title, { lower: true, strict: true });
        }

        const product = await productModal.findOneAndUpdate(
            { slug },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated successfully", product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// ======================= DELETE PRODUCT =======================
export const deleteProduct = async (req, res) => {
    try {
        const { slug } = req.params;

        const product = await productModal.findOneAndDelete({ slug });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// ======================= ADD REVIEW =======================
export const addReview = async (req, res) => {
    try {
        const { slug } = req.params;
        const { name, comment, email } = req.body;

        if (!name || !comment) {
            return res.status(400).json({ success: false, message: "Name and comment are required" });
        }

        const product = await productModal.findOne({ slug });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.reviews.push({ name, comment, email });
        await product.save();

        res.status(200).json({ success: true, message: "Review added successfully", product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
