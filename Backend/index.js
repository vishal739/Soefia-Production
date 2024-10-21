const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const passport = require("passport");
const pdfParse = require("pdf-parse");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require('fs');
const session = require("./utils/sessions");
require('./utils/auth')
require('./db/mongoose')
const authRoute = require("./routes/authRoute")
const lessonRoute = require("./routes/lessonRoute")
const adminRoute = require("./routes/adminRoute")
const studentRoute = require("./routes/studentRoute")
const schoolRoute = require("./routes/schoolRoute")
const teacherRoute = require("./routes/teacherRoute")
const classRoute = require("./routes/classRoute")
const deitaRoute = require("./routes/deitaRoute")
const { lessonGenerator } = require('./controller/deitaController');
const { error } = require("console");
const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://soefia.netlify.app', 'https://soefia-1.netlify.app'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,PATCH,DELETE',
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("combined"));
app.use(express.json());


const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  req.session.viewCount = (req.session.viewCount || 0) + 1;
  console.log(req.user);
  res.send(`user: ${req.user ? req.user.email : 'guest'} | View count: ${req.session.viewCount} | Soefia API connected successfully`);
})

app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    // Step 1: Read the uploaded file from the file system using the path provided by multer
    const pdfBuffer = fs.readFileSync(req.file.path);  // Read file into a buffer
    const data = await pdfParse(pdfBuffer);            // Extract PDF data using pdfParse

    // Step 2: Format the extracted PDF text
    let formattedText = data.text
      .replace(/\n/g, ' ')       // Replace newlines with spaces
      .replace(/\s+/g, ' ')      // Replace multiple spaces with a single space
      .trim();                   // Trim leading and trailing whitespace

    // console.log("Formatted Text:", formattedText);     // Log the formatted text

    // Step 3: Delete the file after processing to clean up
    fs.unlinkSync(req.file.path); // Remove the file after processing

    // Step 4: If the text is not empty, call lessonGenerator with the formatted text
    if (formattedText) {
      try {
        const response = await lessonGenerator({ input: formattedText }); // Generate the lesson
        console.log("API Response:", response);

        // Check if the response is valid and send a success response
        if (response) {
          return res.status(200).json({
            success: true,
            data: response
          });
        } else {
          // Send an error response if lesson generation fails
          return res.status(500).json({
            success: false,
            message: 'Lesson generation failed'
          });
        }
      } catch (error) {
        // Handle errors during lesson generation
        console.error('Error generating lesson:', error.message);
        return res.status(500).json({
          success: false,
          message: 'Lesson generation failed',
          error: error.message
        });
      }
    } else {
      // Handle case where formatted text is empty or invalid
      return res.status(500).json({
        success: false,
        message: 'Lesson generation failed: Empty or invalid text'
      });
    }

  } catch (err) {
    // Handle errors in reading or extracting text from the PDF
    console.error('Error processing PDF:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Text extraction failed',
      error: err.message
    });
  }
});

app.use("/api/auth", authRoute);
app.use("/api/lesson", lessonRoute);
app.use("/api/admin", adminRoute);
app.use("/api/student", studentRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/school", schoolRoute);
app.use("/api/class", classRoute);
app.use("/api/deita", deitaRoute);

app.listen(port, () => {
  console.log("Server started on port " + port);
});
