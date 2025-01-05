import express from 'express';
import { createMonth, getMonthDetails, getMonths, getMonthSummary } from '../Controllers/month.controller.js';


const router = new express.Router();

router.post("/createmonth",createMonth);
router.get("/month/:monthId/summary", getMonthSummary);
router.get('/months', getMonthDetails);
router.get('/allmonths',getMonths)
// router.patch("/month/:monthId/saving-target", updateSavingTarget);


export default router;