import slugify from "slugify";
import { categoryModel } from "../models/category.models.js"

export const createCategory = async (req, res) => {
    try {
        const { categoryName, image, description, isPublished } = req.body
        const user = req.user;
        const isExist = await categoryModel.findOne({ slug: slugify(categoryName) })
        if (!categoryName) return res.status(400).send({
            success: false, message: "Category name  required"
        })

        if (!image) return res.status(400).send({
            success: false, message: "image name id required"
        })



        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Login again"
            })
        }
        if (user) {
            if (!user.isVerified) {
                return res.status(400).send({
                    success: false,
                    message: "Please Login with OTP"
                })
            }
            if (user.role === "user") {
                return res.status(403).send({
                    success: false,
                    message: "Your nor Not Authorized "
                })
            }

            if (!isExist) return res.status(400).send({
                success: false, message: "already Exist category name"
            })

            const newCategory = categoryModel({
                categoryName, description, image, isPublished,
                author: user.id,
                slug: slugify(categoryName)

            })
            newCategory.save();

            return res.status(201).send({
                success: true,
                message: ` ${categoryName} Created Successfully`,
                newCategory
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const getCategory = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).send(
            {
                success: true,
                message: error.message
            })
    }
}

export const publicCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({ isPublished: true })
        if (!categories) {
            return res.status(400).send({
                success: false,
                message: "Reload page"
            })
        }
        if (categories.length === 0) {
            return res.status(200).send({
                success: true,
                message: "No record found"
            })
        }

        if (categories) {
            return res.status(200).send({
                success: true,
                message: "Category fetch successfully",
                categories: categories
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })

    }
}

export const privateCategories = async (req, res) => {
    try {
        const user = req.user
        const categories = await categoryModel.find({ author: user.id })
        console.log(user,categories);
        
        if (!categories) {
            return res.status(400).send({
                success: false,
                message: "Reload page"
            })
        }
        if (categories.length === 0) {
            return res.status(200).send({
                success: true,
                message: "No record found"
            })
        }

        if (categories) {
            return res.status(200).send({
                success: true,
                message: "Category fetch successfully",
                categories: categories
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })

    }
}