import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateUserProfile,
} from "../controller/authController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Register Route
router.post("/register", registerUser);

//Login Route
router.post("/login", loginUser);

//Get User Profile Route
router.get("/profile", protect, getProfile);

//Update User Profile Route
router.put("/profile", protect, updateUserProfile);

export default router;
