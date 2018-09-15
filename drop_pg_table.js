const db = require('./db');

db.drop_table()
.then(res => {
  console.log('finished');
})
.catch(err => console.error(err));
