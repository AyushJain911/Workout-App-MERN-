import express from "express";
import { LoginUser, SignupUser } from "../controller/UserController.js";

const router = express.Router();

// login route
router.post("/login", LoginUser);

// signup route
router.post("/signup", SignupUser);

export default router;
