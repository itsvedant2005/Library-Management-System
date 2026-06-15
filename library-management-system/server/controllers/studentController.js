const Student = require("../models/Student");
const Issue = require("../models/Issue");

exports.getStudents = async (req, res) => {

  try {

    const students =
      await Student.find()
      .select("-password");

    const studentsData =
      await Promise.all(

        students.map(
          async (student) => {

            const issues =
              await Issue.find({
                studentId:
                  student._id,
                status: "Issued"
              })
              .populate("bookId");

            const booksIssued =
              issues.length;

            const currentFine =
              issues.reduce(
                (sum, issue) =>
                  sum +
                  (issue.fine || 0),
                0
              );

            return {
              _id: student._id,
              name: student.name,
              email: student.email,
              booksIssued,
              currentFine,
              issues
            };
          }
        )
      );

    res.json(studentsData);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};