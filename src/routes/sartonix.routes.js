import express from 'express';
import { createEmail, getAllEmails } from '../controllers/sartonix.controller.js';

export const SartonixRouter = express.Router();

// Define your Sartonix routes here
SartonixRouter.post('/sartonix',createEmail)
SartonixRouter.get('/sartonix', getAllEmails);