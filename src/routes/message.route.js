import express from 'express'
import { createMessage, getAllMessage } from '../controllers/Message.controller.js'
export const messageRoute = express.Router()

messageRoute.post('/message',createMessage)


messageRoute.get('/messages',getAllMessage)