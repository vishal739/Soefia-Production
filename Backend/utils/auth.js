/**
 * @fileoverview Authentication strategies using Passport.js for local and Google OAuth2.
 * 
 * This module sets up Passport.js strategies for local authentication and Google OAuth2.
 * It uses bcrypt for password hashing and comparison, and Mongoose for database operations.
 * 
 * @requires passport
 * @requires passport-google-oauth2
 * @requires passport-local
 * @requires dotenv
 * @requires ../model/userModel
 * @requires bcrypt
 */

/**
 * LocalStrategy for authenticating users using email and password.
 * 
 * @param {Object} options - Options for the strategy.
 * @param {string} options.usernameField - The field name for the username (email).
 * @param {Function} verify - The verification function.
 * @returns {void}
 */

/**
 * Compares a plaintext password with a hashed password.
 *
 * @param {string} password - The plaintext password to compare.
 * @param {Object} user - The user object containing the hashed password.
 * @param {string} user.password - The hashed password stored in the user object.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
 */

/**
 * GoogleStrategy for authenticating users using Google OAuth2.
 * 
 * @param {Object} options - Options for the strategy.
 * @param {string} options.clientID - The Google client ID.
 * @param {string} options.clientSecret - The Google client secret.
 * @param {string} options.callbackURL - The callback URL after Google authentication.
 * @param {boolean} options.passReqToCallback - Whether to pass the request to the callback.
 * @param {Function} verify - The verification function.
 * @returns {void}
 */

/**
 * Finds a user in the database by their email address.
 *
 * @param {Object} profile - The profile object containing user information.
 * @param {Array} profile.emails - An array of email objects.
 * @param {string} profile.emails[].value - The email address of the user.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found, otherwise null.
 */

/**
 * Serializes the user for the session.
 * 
 * @param {Object} user - The user object to serialize.
 * @param {Function} done - The callback function.
 * @returns {void}
 */

/**
 * Deserializes the user from the session.
 * 
 * @param {Object} user - The user object to deserialize.
 * @param {Function} done - The callback function.
 * @returns {void}
 */
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
      
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        return done(null, user);
      } 
    
      return done(null, false, { message: "Please sign up first." });
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


