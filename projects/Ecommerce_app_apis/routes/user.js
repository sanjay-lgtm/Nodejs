import express from "express";
import { login, signUp } from "../controller/user.js";

const router = express.Router();

router.post("/signup", signUp); // Register user API

router.post("/login", login); // Login user API


export default router;