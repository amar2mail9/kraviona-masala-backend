
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


        } = req.body;

        const author = req.user;
        console.log("author", author);

        if (!author) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }
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
export const getPublicProducts = async (req, res) => {
    try {
        try {
            const products = await productModal.find({ isPublished: true }).sort({ createdAt: -1 })
            return res.status(200).json({ success: true, length: products.length, products })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ======================= GET ALL PRODUCTS (ADMIN) =======================
export const getSellerAllProducts = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }
    if (user.role !== 'seller') {
      return res.status(403).json({ success: false, message: "Only Seller can access all products" });
    }

    // ✅ products ko pehle define karo
    const products = await productModal.find({ author: user._id }).sort({ createdAt: -1 });

    console.log(products); // ✅ ab yaha safe hai

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found" });
    }

    return res.status(200).json({
      success: true,
      length: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


