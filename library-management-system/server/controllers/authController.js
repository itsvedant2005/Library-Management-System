const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists"
      });
    }

    // Hash password here
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const student = await Student.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Registration successful",
      student
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.studentLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const student =
      await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        student.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        id: student._id,
        role: "student"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid Admin Credentials"
      });
    }

    const token = jwt.sign(
      {
        role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      role: "admin"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};