import express from "express";
import { registerUser, loginUser, getUser } from "../Controllers/user.controller.js";
import { adminMiddleware } from "../Middleware/adminMiddleware.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getdata", adminMiddleware, getUser);

export default router;
