import express from 'express';
import { createTransaction } from '../Controllers/transaction.controller.js';

const router = new express.Router();

router.post('/transaction', createTransaction);

export default router;