const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Borrow = require("../models/Borrow");

router.get("/with-borrows", async (req, res) => {
  try {
    // Get all users with role "user"
    const users = await User.find({ role: 'user' });

    // For each user, get borrowed and returned books
    const userData = await Promise.all(
      users.map(async (user) => {
        const borrowed = await Borrow.find({
          userId: user._id,
          returnedAt: null
        }).populate("bookId");

        const returned = await Borrow.find({
          userId: user._id,
          returnedAt: { $ne: null }
        }).populate("bookId");

        return {
          ...user.toObject(),
          borrowed,
          returned
        };
      })
    );

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error getting users with borrows:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
