const redis = require("redis");
require('dotenv').config();

const { createClient } = require('redis'); 
const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
redisClient.connect().catch(console.error);
redisClient.on("connect", (message) => {
   console.log(`Redis Connected successfully`);
});
redisClient.on("disconnect", (message) => {
   console.log(`Redis server disconnected`);
});
redisClient.on("error", () => {
   console.log("Unable to connect redis client");
});
module.exports = redisClient;