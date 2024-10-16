const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("./utils/sessions");
require('./utils/auth')
require('./db/mongoose')
const authRoute = require("./routes/authRoute")
const lessonRoute = require("./routes/lessonRoute")
const adminRoute= require("./routes/adminRoute")
const studentRoute= require("./routes/studentRoute")
const schoolRoute= require("./routes/schoolRoute")
const teacherRoute= require("./routes/teacherRoute")
const classRoute= require("./routes/classRoute")
const deitaRoute= require("./routes/deitaRoute")

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://soefia.netlify.app','https://soefia-1.netlify.app'];
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
app.use("/api/auth", authRoute);
app.use("/api/lesson",lessonRoute);
app.use("/api/admin",adminRoute);
app.use("/api/student",studentRoute);
app.use("/api/teacher",teacherRoute);
app.use("/api/school",schoolRoute);
app.use("/api/class",classRoute);
app.use("/api/deita",deitaRoute);

app.listen(port, () => {
  console.log("Server started on port " + port);
});
