const redis = require("redis");
require('dotenv').config();

const { createClient } = require('redis'); 
/**
 * Creates a Redis client instance with the specified configuration.
 * 
 * The configuration includes:
 * - `password`: The password for authenticating with the Redis server, retrieved from the environment variable `REDIS_PASSWORD`.
 * - `socket`: An object containing the host and port for the Redis server, retrieved from the environment variables `REDIS_HOST` and `REDIS_PORT`.
 * 
 * @constant {object} redisClient - The Redis client instance.
 */
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