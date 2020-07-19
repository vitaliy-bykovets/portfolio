require('dotenv').config();

// File with constants
const config = {
  app: {
    jwtExpireDuration: 86400 * 60
  }
};

module.exports = config;