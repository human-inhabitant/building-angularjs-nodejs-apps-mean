const path = require('path');

const rootPath = path.normalize(path.join(__dirname, '..', '..'));
const dbUrl = process.env.DB_URL || 'mongodb://localhost/multivision';

module.exports = {
  development: {
    dbUrl,
    port: process.env.PORT || 3e3,
    rootPath
  },
  production: {
    dbUrl,
    port: process.env.PORT || 80,
    rootPath
  }
};
