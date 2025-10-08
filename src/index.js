import express from "express"
const app =express()
import cors from 'cors'

import dotenv from 'dotenv'
import { DBConnection } from "./db/db.js"
import { userRouter } from "./routes/user.routes.js"
import { categoryRouter } from "./routes/category.routes.js"
import ProductRouter from "./routes/product.routes.js"
import { messageRoute } from "./routes/message.route.js"

dotenv.config()
const PORT  = process.env.PORT
DBConnection()
app.use(cors({
    // origin:process.env.FRONTEND_URL,
    origin: "*",


    methods:["POST","GET","PUT","DELETE"],
    credentials: false
}))
// middleware
app.use(express.json())

app.use('/api/v1',userRouter)
console.log("Email:", process.env.NODEMAILER_EMAIL);
console.log("Pass:", process.env.NODEMAILER_PASS ? "Loaded" : "Missing");


app.use('/api/v1', categoryRouter)
app.use('/api/v1', ProductRouter)
app.use('/api/v1', messageRoute)
app.listen(PORT, ()=>{
    console.log(`Sever is running  on PORT:${PORT}\nhttp://localhost:${PORT}`);
    
})

