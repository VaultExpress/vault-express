/* eslint-disable no-console */

const db = require('./db');

db.drop_table()
  .then(() => console.log('finished'))
  .catch(err => console.error(err));
