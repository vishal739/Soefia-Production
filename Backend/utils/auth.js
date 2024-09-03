const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const model = require("../model/userModel");
const User = model.User;
const bcrypt= require("bcrypt")

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) return done(null, false, { message: 'Incorrect email.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return done(null, user);

    return done(null, false, { message: 'Incorrect password.' });
  } catch (err) {
    console.log(err);
    return done(err);
  }
}));


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.HOST_URL}/api/auth/google/callback`,
  passReqToCallback: true
},
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) return done(null, user);

      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });

      await user.save();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // const user= User.findById(id);
  console.log(user);
  done(null, user);
});
