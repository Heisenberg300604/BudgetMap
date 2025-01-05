import express from "express";
import { getUserDetails, login, logout, register } from "../Controllers/auth.controller.js";


const router = new express.Router();

router.post("/register", register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/getuserdetails",getUserDetails)


export default router;