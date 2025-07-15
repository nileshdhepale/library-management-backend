const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  borrowedAt: {
    type: Date,
    default: Date.now,
  },
  returnedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Borrow", borrowSchema);
