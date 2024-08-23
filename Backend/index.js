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
const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://soefia.netlify.app'];
app.use(cors({
  origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: 'GET,POST,PUT,DELETE',
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
    res.send(`user: ${req.user? req.user.email : 'guest'} | View count: ${req.session.viewCount} | Soefia API connected successfully`);
})
app.use("/auth", authRoute);


app.listen(port, () => {
  console.log("Server started on port " + port);
});
