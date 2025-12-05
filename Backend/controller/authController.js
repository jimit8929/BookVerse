import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/User.js";



export const generateToken = (id) => {
  const token = jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  console.log("\n===== TOKEN GENERATED =====");
  console.log("USER ID:", id);
  console.log("JWT_SECRET (sign):", JSON.stringify(process.env.JWT_SECRET));
  console.log("TOKEN:", token);

  return token;
};


// ====================== REGISTER USER ======================
export const registerUser = async (req, res) => {
  console.log("\n===== REGISTER USER =====");

  const { name, email, password } = req.body;
  console.log("REGISTER BODY:", req.body);

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      const token = generateToken(user._id);
      return res.status(201).json({
        message: "User registered successfully",
        token,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } 
  catch (err) {
    console.log("❌ REGISTER ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


// ====================== LOGIN USER ======================
export const loginUser = async (req, res) => {
  console.log("\n===== LOGIN USER =====");

  const { email, password } = req.body;
  console.log("LOGIN BODY:", req.body);

  try {
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      return res.json({
        message: "User logged in successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } 
  catch (err) {
    console.log("❌ LOGIN ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

//Get current user Controller
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isPro: user.isPro,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

//Update current user Controller
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
