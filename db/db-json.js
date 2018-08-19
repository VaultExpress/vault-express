const jsonfile = require('jsonfile');
const file = process.env.DB_JSON;

let db = {};

db.json = {};

db.init = () => {
  jsonfile.readFile(file, function(err, obj) {
    db.json = obj;
    return err;
  });
};

db.findByName = (name) => {
  let res = {};
  for(let i=0, len=db.json.length; i < len; i++) {
    if (db.json[i]["username"] == name) {
      res = db.json[i];
      break;
    }
  }
  return res;
};

db.seed = () => {
  var users = [
    {
      user_id: 1001,
      username: "tester1",
      password: "xxxxxxx",
      email: "tester1@example.com",
      display_name: "Tester 1",
      profile_image: "",
      info1: "",
      info2: "",
      info3: "",
      info4: "",
      info5: ""
    },
    {
      user_id: 1002,
      username: "tester2",
      password: "xxxxxxx",
      email: "tester2@example.com",
      display_name: "Tester 2",
      profile_image: "",
      info1: "",
      info2: "",
      info3: "",
      info4: "",
      info5: ""
    }
  ];

  jsonfile.writeFile(file, users, function(err) {
    return err;
  });
};

module.exports = db;
