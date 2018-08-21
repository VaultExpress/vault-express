const bcrypt = require('bcrypt');

const saltRounds = 12;

let util = {};

util.encrypt = (plain_password) => {
  return bcrypt.hashSync(plain_password, saltRounds);
};

util.comparePassword = (plain_password, hash_password) => {
  return bcrypt.compareSync(plain_password, hash_password);
};

module.exports = util;
