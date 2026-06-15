const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },

  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  },

  issueDate: Date,

  dueDate: Date,

  returnDate: Date,

  fine: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: [
      "Pending",
      "Issued",
      "Returned",
      "Rejected"
    ],
    default: "Pending"
  }
});

module.exports = mongoose.model("Issue", issueSchema);