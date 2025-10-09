import express from "express";
import { searchProducts } from "../controllers/search.controller.js";


const router = express.Router();

// Search products by name or description
router.get("/search", searchProducts);

export const searchRoutes = router;