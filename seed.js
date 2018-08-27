require('dotenv').config();
const db = require('./db');

db.seed();
console.log('seed finished');
