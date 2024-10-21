/**
 * @fileoverview Establishes a connection to the MongoDB database using Mongoose.
 * @requires mongoose - Mongoose library for MongoDB object modeling.
 * @requires dotenv/config - Loads environment variables from a .env file into process.env.
 * 
 * Connects to the MongoDB database using the connection string specified in the MONGODB_URL
 * environment variable. Logs a success message if the connection is successful, otherwise
 * logs an error message.
 */
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL, {
 
})
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });
