const durl = process.env.DATABASE_URL;

const seed = require('../seed.json');

let db = {};
db.engine = 'postgresql';

module.exports = db;
