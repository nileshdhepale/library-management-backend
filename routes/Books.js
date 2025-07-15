const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Add Book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body); // Creates new Book from request body
    const savedBook = await book.save(); // Saves to MongoDB
    res.status(201).json(savedBook); // Sends saved data back
  } catch (err) {
    res.status(400).json({ message: err.message }); // Sends error if any
  }
});

// Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Book
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Book
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
