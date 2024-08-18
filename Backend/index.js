const express= require("express");
const morgan= require("morgan");
const cors= require("cors");
require('dotenv').config();
const mongoose= require("mongoose");
const passport = require("passport");
const session= require("express-session");
require('./auth')
require('./db/connect')
const cookieSession = require("cookie-session");
const authRoute= require("./routes/authRoute");

const app= express();

const allowedOrigins = ['http://localhost:5173', 'https://soefia.netlify.app/'];

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

  // app.use(cors({ origin: '*' }));
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true
// }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("combined"));
app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/", (req, res)=>{
    res.send("Soefia Api connected Succesfully")
})
app.use("/auth",authRoute);


// main().catch(err => console.log(err));
// async function main() {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log('database connected');
// }
app.listen(8080, ()=>{
    console.log("Server started");
})