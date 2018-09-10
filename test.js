require('dotenv').config();
let nenv = process.env.NODE_ENV;
let durl = process.env.DATABASE_URL;
console.log(nenv);
console.log(durl);
if ((durl.indexOf('postgres://') < 0) && (durl.indexOf('mongodb://') < 0)) {
  console.log('not db');
  if (nenv.indexOf('production') >= 0) {
    throw Error('not allow to use lowdb for production env');
  }
}

