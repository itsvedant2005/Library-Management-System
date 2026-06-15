const Book = require("../models/Book");

// Add Book
exports.addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      isbn,
      quantity
    } = req.body;

    const book = await Book.create({
      title,
      author,
      category,
      isbn,
      quantity,
      availableCopies: quantity
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Book deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};