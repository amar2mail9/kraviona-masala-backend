import express from "express"
const app =express()
import cors from 'cors'

import dotenv from 'dotenv'
import { DBConnection } from "./db/db.js"
import { userRouter } from "./routes/user.routes.js"
import { categoryRouter } from "./routes/category.routes.js"
import ProductRouter from "./routes/product.routes.js"
import { messageRoute } from "./routes/message.route.js"
import { searchRoutes } from "./routes/search.routes.js"

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

app.use('/api/v1', userRouter)

app.use('/api/v1', categoryRouter)
app.use('/api/v1', ProductRouter)
app.use('/api/v1', messageRoute)
app.use('/api/v1', searchRoutes)
app.listen(PORT, ()=>{
    console.log(`Sever is running  on PORT:${PORT}\nhttp://localhost:${PORT}`);
    
})

