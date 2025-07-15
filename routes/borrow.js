const express = require("express");
const router = express.Router();
const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

// Borrow a book
router.post("/", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.quantity < 1) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Create borrow record
    const borrow = new Borrow({ userId, bookId });
    await borrow.save();

    // Reduce quantity
    book.quantity -= 1;
    await book.save();

    res.status(201).json({ message: "Book borrowed successfully", borrow });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const borrowedBooks = await Borrow.find({ userId, returnedAt: null })
      .populate("bookId")
      .sort({ createdAt: -1 }); // optional: latest first

    res.status(200).json(borrowedBooks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch borrowed books", error });
  }
});

router.post("/return/:borrowId", async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrowRecord = await Borrow.findById(borrowId);
    if (!borrowRecord || borrowRecord.returnedAt) {
      return res.status(404).json({ message: "Valid borrow record not found" });
    }

    borrowRecord.returnedAt = new Date();
    await borrowRecord.save();

    const book = await Book.findById(borrowRecord.bookId);
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res
      .status(200)
      .json({ message: "Book returned successfully", borrowRecord });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

module.exports = router;
