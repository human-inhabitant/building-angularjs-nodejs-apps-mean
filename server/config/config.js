const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '..', '..'));

module.exports = {
  development: {
    dbUrl: 'mongodb://localhost/multivision',
    port: process.env.PORT || 3e3,
    rootPath
  },
  production: {
    dbUrl: 'mongodb+srv://loc8r_user:eH2IswDaZrBi3wi2@cluster0.bgloi.mongodb.net/multivision?retryWrites=true&w=majority',
    port: process.env.PORT || 80,
    rootPath
  }
};
