import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// get secret data
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USERNAME = process.env.DB_USERNAME;

export function DBConnection() {
  try {
    mongoose
      .connect(
        `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@blog.ehb0p.mongodb.net/kraviona-masala`
      )
      .then(() => {
        console.log(`DB connected  Successfully`);
      });
  } catch (error) {
    console.log(error.message);
  }
}
