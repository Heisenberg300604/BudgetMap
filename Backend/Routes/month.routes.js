import express from 'express';
import { createMonth } from '../Controllers/month.controller.js';

const router = new express.Router();

router.post("/createmonth",createMonth);

export default router;