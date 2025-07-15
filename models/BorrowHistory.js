const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  action: { type: String, enum: ['borrow', 'return'] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BorrowHistory', borrowSchema);
