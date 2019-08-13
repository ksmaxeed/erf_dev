const _ = require('lodash');
const development = require('./development');
const test = require('./test');
const production = require('./production');

const env = process.env.NODE_ENV || 'development';
const configs = {
  development,
  test,
  production
};
const defaultConfig = {
  env: env
};

const config = _.merge(defaultConfig, configs[env]);

module.exports = config;
