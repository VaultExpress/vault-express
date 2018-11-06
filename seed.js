/* eslint-disable no-console */

const db = require('./db');
const seed = require('./seed.json');

db.seed(seed)
  .then(() => console.log('seed finished'))
  .catch(err => console.error(err));
