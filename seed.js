const db = require('./db');
const seed = require('./seed.json');

db.seed(seed)
.then(res => {
  console.log('seed finished');
})
.catch(err => console.error(err));
