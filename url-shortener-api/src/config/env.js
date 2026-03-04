const dotenv = require('dotenv');

function loadEnv() {
  dotenv.config();
  return process.env;
}

module.exports = { loadEnv };
