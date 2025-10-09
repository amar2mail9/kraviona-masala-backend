import { productModal } from "../models/product.model.js";

export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    const regex = new RegExp(keyword, "i"); // case-insensitive

    const products = await productModal
      .find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      })
      .populate("category")
      .sort({ createdAt: -1 });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found matching the keyword",
      });
    }

    res.status(200).json({
      success: true,
      length: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
