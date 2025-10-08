import express from "express"
import { createCategory, deleteCategory, getAllPublicCategories, getSellerCategories, } from "../controllers/category.controller.js"
import { verifyToken } from "../middleware/verfiy.middleware.js"

export const categoryRouter = express.Router()

categoryRouter.post('/category',verifyToken ,createCategory)
categoryRouter.get('/categories', getAllPublicCategories)


categoryRouter.get('/seller/categories',verifyToken, getSellerCategories)

categoryRouter.delete('/category/:id', verifyToken, deleteCategory)