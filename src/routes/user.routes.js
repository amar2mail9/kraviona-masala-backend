import express from 'express'
import { forgetPassword, loginUserPassword, registerUser, resendOtp, verifyOtp } from '../controllers/user.controller.js'

export const userRouter = express.Router()

userRouter.post('/user/register',registerUser)
userRouter.post('/user/verify',verifyOtp)
userRouter.post('/user/resendotp',resendOtp)
userRouter.post('/user/password',loginUserPassword)
userRouter.post('/user/forgetpassword',forgetPassword)