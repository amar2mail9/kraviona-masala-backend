
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
          isPublished

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
          isPublished
          , author,
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

// ======================= GET SINGLE PRODUCT =======================
export const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModal.findOne({ slug, isPublished: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getSingleProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("get product id:", id);
    const product = await productModal.findById(id);
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
    const { id } = req.params;
    console.log("update product id:", id);

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
      isPublished
    } = req.body;

    const author = req.user;
    if (!author) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const product = await productModal.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update fields if they are provided in the request body
    if (title) {
      product.title = title;
      product.slug = slugify(title, { lower: true, strict: true });
    }
    if (description) product.description = description;
    if (images) product.images = images;
    if (thumbnail) product.thumbnail = thumbnail;
    if (price !== undefined) product.price = price;
    if (discount !== undefined) product.discount = discount;
    if (stock !== undefined) product.stock = stock;
    if (status) product.status = status;
    if (category) product.category = category;
    if (isPublished !== undefined) product.isPublished = isPublished;

    await product.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================= DELETE PRODUCT =======================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const author = req.user;

    if (!author) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const product = await productModal.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Await deletion
    await productModal.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
