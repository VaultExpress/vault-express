require('dotenv').config();
const db = require('./db/db');

let test_data = {
  "user_id": 9991001,
  "username": "tester",
  "password": "yyyyyy",
  "email": "tester@example.com",
  "display_name": "I am Tester",
  "profile_image": "",
  "info1": "",
  "info2": "",
  "info3": "",
  "info4": "",
  "info5": ""
};

//let res1 = db.create(test_data);
//console.log(res1);

let res2 = db.createUser(test_data);
console.log(res2);

let res3 = db.findByName('tester');
console.log(res3);

let update_data = {
  "user_id": 9991001,
  "username": "tester",
  "password": "zzzzzzz",
  "email": "tester@example.com",
  "display_name": "I am new Tester",
  "profile_image": "",
  "info1": "x",
  "info2": "y",
  "info3": "z",
  "info4": "",
  "info5": ""
};

let res4 = db.update(update_data);
console.log(res4);

let res5 = db.findById(9991001);
console.log(res5);

let res6 = db.remove(9991001);
console.log(res6);

