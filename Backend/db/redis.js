const redis = require("redis");
require('dotenv').config();

const { createClient } = require('redis'); 
const redisClient = createClient({
    password: 'qDHaKQ8XNoCDNSRDKeHiSNEzoN8O1jUS',
    socket: {
        host: 'redis-12907.c11.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 12907
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