import express from "express";
import {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    addReview
} from "../controllers/product.controller.js";

const ProductRouter = express.Router();

ProductRouter.post("/product", createProduct);
ProductRouter.get("/public/products", getAllProducts);
ProductRouter.get("/product/:slug", getSingleProduct);
ProductRouter.put("/product/:slug", updateProduct);
ProductRouter.delete("/product/:slug", deleteProduct);
ProductRouter.post("/product/:slug/review", addReview);

export default ProductRouter;
