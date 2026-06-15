const express = require("express");

const router = express.Router();

const auth =
require("../middleware/authMiddleware");

const {
  requestBook,
  getRequests,
  approveRequest,
  rejectRequest,
  myBooks,
  returnBook
} = require("../controllers/issueController");

router.post(
  "/request",
  auth,
  requestBook
);

router.get(
  "/requests",
  getRequests
);

router.put(
  "/approve/:id",
  approveRequest
);

router.put(
  "/reject/:id",
  rejectRequest
);

router.get(
  "/my-books",
  auth,
  myBooks
);

router.put(
  "/return/:id",
  returnBook
);

module.exports = router;