
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protect = async (req, res, next) => {

  console.log("\n===== PROTECT MIDDLEWARE =====");

  console.log("AUTH HEADER:", req.headers.authorization);
  console.log("JWT_SECRET (verify):", JSON.stringify(process.env.JWT_SECRET));

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

    const token = req.headers.authorization.split(" ")[1];
    console.log("TOKEN RECEIVED:", token);

    if (!token) {
      console.log("❌ No token found");
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODED PAYLOAD:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("USER FOUND:", req.user?._id);

      next();
    } 
    catch (error) {
      console.log("❌ JWT VERIFY ERROR:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }

  } else {
    console.log("❌ Authorization header missing");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};