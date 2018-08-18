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

db.findByName = (username) {

}

db.test = () => {
  var obj = {
    {username:"tester1",password:"xxxxxxx",email:"tester1@example.com"},

  };

  jsonfile.writeFile(file, obj, function(err) {
    if (err) {
      return err;
    } else {
      return obj;
    }
  });
};

module.exports = db;
