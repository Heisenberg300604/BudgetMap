import express from 'express';
import { createTransaction, getAllTransactions} from '../Controllers/transaction.controller.js';

const router = new express.Router();

router.post('/transaction', createTransaction);
router.get('/transactions',getAllTransactions)

export default router;