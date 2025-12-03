import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, subtitle, chapters } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const book = await Book.create({
      userId: req.user._id,
      title,
      author,
      subtitle,
      chapters,
    });

    res.status(201).json({ message: "Book created successfully", book });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateBookCover = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    if (req.file) {
      book.coverImage = req.file.path.replace(/\\/g, "/");
    } else {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const updatedBook = await book.save();

    res
      .status(200)
      .json({ message: "Book cover updated successfully", updatedBook });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
