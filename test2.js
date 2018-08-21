const util = require('./util');

let txt = 'password12345';

let res1 = util.encrypt(txt);
console.log(res1, res1.length);

let res2 = util.comparePassword(txt, res1);
console.log(res2);

let res3 = util.comparePassword(txt, 'password');
console.log(res3);
