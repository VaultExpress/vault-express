require('dotenv').config();
let durl = process.env.DATABASE_URL;
let cfg = require('../config');

if (durl.indexOf('postgres://') > -1) module.exports = require('./db-postgres')(durl, cfg)
else if (durl.indexOf('mongodb://') > -1) module.exports = require('./db-mongo')(durl, cfg)
else module.exports = require('./db-json')(durl, cfg);
