const session = require("express-session");
const RedisStore = require("connect-redis").default
const redisClient = require("../db/redis");



module.exports = session({
   store: new RedisStore({ client: redisClient }),
   secret: "secret$123",
   saveUninitialized: false,
   resave: false,
   name: "_sessionId",
   cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
   },
});