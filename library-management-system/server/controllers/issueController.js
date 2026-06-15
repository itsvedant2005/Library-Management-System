const Issue = require("../models/Issue");
const Book = require("../models/Book");

exports.requestBook = async (req, res) => {

  try {

    const existingRequest =
      await Issue.findOne({
        studentId: req.user.id,
        bookId: req.body.bookId,
        status: {
          $in: [
            "Pending",
            "Issued"
          ]
        }
      });

    if (existingRequest) {
      return res.status(400).json({
        message:
          "Book already requested or issued"
      });
    }

    const issue =
      await Issue.create({
        studentId: req.user.id,
        bookId: req.body.bookId,
        status: "Pending"
      });

    res.status(201).json(issue);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getRequests = async (req, res) => {
  try {

    const requests = await Issue.find({
      status: "Pending"
    })
      .populate("studentId")
      .populate("bookId");

    res.json(requests);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.approveRequest = async (req, res) => {
  try {

    const issue =
      await Issue.findById(req.params.id);

    const book =
      await Book.findById(issue.bookId);

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        message: "No copies available"
      });
    }

    issue.status = "Issued";

    issue.issueDate = new Date();

    const dueDate = new Date();

    dueDate.setDate(
      dueDate.getDate()  + 7
    );

    issue.dueDate = dueDate;

    await issue.save();

    book.availableCopies--;

    await book.save();

    res.json({
      message: "Book Issued"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.rejectRequest = async (req, res) => {
  try {

    await Issue.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected"
      }
    );

    res.json({
      message: "Request Rejected"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.myBooks = async (req, res) => {

  try {

    const books = await Issue.find({
      studentId: req.user.id
    })
    .populate("bookId");

    res.json(books);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.returnBook = async (req, res) => {

  const issue =
    await Issue.findById(
      req.params.id
    );

  const book =
    await Book.findById(
      issue.bookId
    );

  issue.status = "Returned";

  issue.returnDate =
    new Date();

  const lateDays = Math.max(
    0,
    Math.ceil(
      (new Date() - issue.dueDate) /
      (1000 * 60 * 60 * 24)
    )
  );

  issue.fine =
    lateDays * 5;

  await issue.save();

  book.availableCopies++;

  await book.save();

  res.json({
    message:
      "Book Returned",
    fine:
      issue.fine
  });

};