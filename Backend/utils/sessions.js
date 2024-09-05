const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redisClient = require("../db/redis");

const isProduction = process.env.NODE_ENV === "production";

module.exports = session({
   store: new RedisStore({ client: redisClient }),
   secret: "secret$123",
   saveUninitialized: false,
   resave: false,
   name: "_soefiaId",
   cookie: {
      secure: isProduction, 
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24, 
      sameSite: isProduction ? "none" : "lax", 
   },
});
