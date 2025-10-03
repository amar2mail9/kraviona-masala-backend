import express from "express"
import { createCategory ,privateCategories,publicCategories} from "../controllers/category.controller.js"
import { verifyToken } from "../middleware/verfiy.middleware.js"

export const categoryRouter = express.Router()

categoryRouter.post('/category',verifyToken ,createCategory)
categoryRouter.get('/categories',publicCategories)

categoryRouter.get('/private/categories',verifyToken,privateCategories)