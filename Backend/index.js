const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("./utils/sessions");
require('./utils/auth')
require('./db/mongoose')
// const RedisStore = require('connect-redis').default; // Correct import
// const { createClient } = require('redis'); 
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

// app.set('trust proxy', 1);

// // Initialize Redis client
// const redisClient = createClient({
//     password: 'qDHaKQ8XNoCDNSRDKeHiSNEzoN8O1jUS',
//     socket: {
//         host: 'redis-12907.c11.us-east-1-3.ec2.redns.redis-cloud.com',
//         port: 12907
//     }
// });
// redisClient.connect().catch(console.error);
// redisClient.on('error', function (err) {
//   console.log('Could not establish a connection with redis. ' + err);
// });
// redisClient.on('connect', function () {
//   console.log('Connected to redis successfully');
// });


// app.use(session({
//   store: new RedisStore({ client: redisClient }),
//   secret: 'secret$%^134',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, 
//     httpOnly: false, 
//     maxAge: 1000 * 60 * 60 * 24 
//   }
// }));

// app.use(function (req, res, next) {
//   if (!req.session) {
//     return next(new Error('Oh no'))
//   }
//   next()
// });
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("combined"));
app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    req.session.viewCount = (req.session.viewCount || 0) + 1;
    console.log(req.user);
    res.send(`user: ${req.user.email} | View count: ${req.session.viewCount} | Soefia API connected successfully`);
})
app.use("/auth", authRoute);


app.listen(port, () => {
  console.log("Server started on port " + port);
});
