import express from "express";
import { login, logout, register } from "../Controllers/auth.controller.js";


const router = new express.Router();

router.post("/register", register);
router.post("/login",login);
router.post("/logout",logout);


export default router;