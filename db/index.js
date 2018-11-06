require('dotenv').config();

const durl = process.env.DATABASE_URL;

const cfg = require('../config');
const dbPostgres = require('./db-postgres');
const dbMongo = require('./db-mongo');
const dbJson = require('./db-json');

if (durl.indexOf('postgres://') > -1) module.exports = dbPostgres(durl, cfg);
else if (durl.indexOf('mongodb://') > -1) module.exports = dbMongo(durl, cfg);
else module.exports = dbJson(durl, cfg);
