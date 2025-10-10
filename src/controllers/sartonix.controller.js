
import { SartonixModel } from "../models/sartonix.model.js";

export const createEmail = async (req, res) => {
    try {
        const { name, message, email } = req.body;

        if (!name || !message || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
           // Simulate email creation logic
        const newEmail = SartonixModel({
            name,
            message,
            email,
            createdAt: new Date(),
        }).save();  

        // In a real application, you would save this to the database
        res.status(201).json({ success: true, 
            message:"Thanks for contacting us, we will get back to you soon!",
            data: newEmail });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getAllEmails = async (req, res) => {
    try {
        const emails = await SartonixModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: emails });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
