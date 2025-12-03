import express from "express";

import {
  createBook,
  getBookById,
  getBooks,
  updateBook,
  updateBookCover,
  deleteBook,
} from "../controller/bookController.js";

import { protect } from "../middlewares/authMiddleware.js";

import {upload} from "../middlewares/uploadMiddleware.js";

const router = express.Router();
router.use(protect);

router.route("/").post(createBook).get(getBooks);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/cover/:id").put(upload, updateBookCover);

export default router;
