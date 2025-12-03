import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// derive __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Routes
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

//Middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


//Connect to Database
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes Middleware
app.use("/api/auth" , authRoutes);
app.use("/api/books" , bookRoutes);
app.use("/api/ai", aiRoutes);


//static folder for images
app.use("/Backend/uploads", express.static(path.join(__dirname, "uploads")));


//start the server
const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});