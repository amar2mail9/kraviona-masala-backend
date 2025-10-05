import express from "express";
import {
    createProduct,

} from "../controllers/product.controller.js";

const ProductRouter = express.Router();

ProductRouter.post("/product", createProduct);


export default ProductRouter;
