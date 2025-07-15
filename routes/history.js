const express = require('express');
const router = express.Router();
const BorrowHistory = require('../models/BorrowHistory');

// GET /history/:userId
router.get('/:userId', async (req, res) => {
  try {
    const history = await BorrowHistory.find({ userId: req.params.userId })
      .populate('bookId', 'title') // Optional: include book title
      .sort({ date: -1 }); // newest first

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

module.exports = router;
