import express from "express";
import {
    createProduct,

    deleteProduct,

    getPublicProducts,

    getSellerAllProducts,
    getSingleProduct,
    getSingleProductByID,
    updateProduct,

} from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/verfiy.middleware.js";


const ProductRouter = express.Router();

ProductRouter.post("/product", verifyToken, createProduct);
ProductRouter.get("/products", getPublicProducts);
ProductRouter.get("/product/:slug", getSingleProduct);
ProductRouter.get("/product-id/:id", verifyToken, getSingleProductByID);
ProductRouter.get("/seller/products", verifyToken, getSellerAllProducts);
ProductRouter.delete("/product/:id", verifyToken, deleteProduct);
ProductRouter.put("/product/:id", verifyToken, updateProduct);

export default ProductRouter;
