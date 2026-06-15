const Book = require("../models/Book");
const Student = require("../models/Student");
const Issue = require("../models/Issue");

exports.getStats = async (req, res) => {

  try {

    const totalBooks =
      await Book.countDocuments();

    const totalStudents =
      await Student.countDocuments();

    const issuedBooks =
      await Issue.countDocuments({
        status: "Issued"
      });

    const pendingRequests =
      await Issue.countDocuments({
        status: "Pending"
      });

    const issues =
      await Issue.find();

    const totalFine =
      issues.reduce(
        (sum, issue) =>
          sum + (issue.fine || 0),
        0
      );

    res.json({
      totalBooks,
      totalStudents,
      issuedBooks,
      pendingRequests,
      totalFine
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};