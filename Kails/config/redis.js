const redis = require('redis');
const config = require('./config');

const redisClient = redis.createClient(config.redisUrl, {});

module.exports = redisClient;
