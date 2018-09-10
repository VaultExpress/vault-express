require('dotenv').config();
let durl = process.env.DATABASE_URL;

if (durl.indexOf('postgres://') > -1) module.exports = require('./db-postgres')
else if (durl.indexOf('mongodb://') > -1) module.exports = require('./db-mongo')
else module.exports = require('./db-json');
