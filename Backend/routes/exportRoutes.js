import express from "express";
import {
  exportAsDocument,
  exportAsPDF,
} from "../controller/exportController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id/pdf", protect, exportAsPDF);
router.get("/:id/doc", protect, exportAsDocument);

export default router;
