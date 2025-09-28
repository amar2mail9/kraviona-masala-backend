import express from "express"
const app =express()
import cors from 'cors'

import dotenv from 'dotenv'
import { DBConnection } from "./db/db.js"
import { userRouter } from "./routes/user.routes.js"

dotenv.config()
const PORT  = process.env.PORT
DBConnection()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))
// middleware
app.use(express.json())

app.use('/api/v1',userRouter)

app.listen(PORT, ()=>{
    console.log(`Sever is running  on PORT:${PORT}\nhttp://localhost:${PORT}`);
    
})

