import slugify from "slugify";
import { categoryModel } from "../models/category.models.js"


export const createCategory = async (req, res) => {
    try {
        const { categoryName, image, description, isPublished } = req.body;
        const user = req.user;
        console.log("category", user._id);

        if (!categoryName) return res.status(400).send({ success: false, message: "Category name required" });
        if (!image) return res.status(400).send({ success: false, message: "Image is required" });
        if (!user) return res.status(400).send({ success: false, message: "Login again" });
        if (!user.isVerified) return res.status(400).send({ success: false, message: "Please login with OTP" });
        if (user.role === "user") return res.status(403).send({ success: false, message: "Not authorized" });

        const slug = slugify(categoryName, { lower: true });
        const isExist = await categoryModel.findOne({ slug });
        if (isExist) return res.status(400).send({ success: false, message: "Category name already exists" });

        const newCategory = new categoryModel({
            categoryName,
            description,
            image,
            isPublished: isPublished,
            author: user._id,
            slug
        });

        await newCategory.save();

        return res.status(201).send({
            success: true,
          message: `${categoryName} created successfully`,
          newCategory
      });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

// ======================= GET ALL CATEGORIES =======================
export const getAllPublicCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({ isPublished: true }).sort({ createdAt: -1 })
        if (!categories || categories.length === 0) {
            return res.status(404).json({ success: false, message: "No categories found" });
        }
        res.status(200).json({ success: true, length: categories.length, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};  

export const getSellerCategories = async (req, res) => {
    try {
        const user = req.user;
        console.log(user);

        if (!user) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }
        if (user.role !== 'seller') {
            return res.status(403).json({ success: false, message: "Only Seller can access all categories" });
        }

        const categories = await categoryModel.find({ author: "68e290fc18fc43d95fd80020" }).sort({ createdAt: -1 });
        if (!categories || categories.length === 0) {
            return res.status(404).json({ success: false, message: "No categories found" });
        }

        return res.status(200).json({
            success: true,
            length: categories.length,
            categories
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ======================= GET ALL CATEGORIES (ADMIN) =======================
export const privateCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find().sort({ createdAt: -1 })
        if (!categories || categories.length === 0) {
            return res.status(404).json({ success: false, message: "No categories found" });
        }
        res.status(200).json({ success: true, length: categories.length, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};