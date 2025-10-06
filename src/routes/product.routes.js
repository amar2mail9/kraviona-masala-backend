import express from "express";
import {
    createProduct,

    getPublicProducts,

    getSellerAllProducts,

} from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/verfiy.middleware.js";


const ProductRouter = express.Router();

ProductRouter.post("/product", verifyToken, createProduct);
ProductRouter.get("/products", getPublicProducts);
ProductRouter.get("/seller/products", verifyToken, getSellerAllProducts);



export default ProductRouter;
