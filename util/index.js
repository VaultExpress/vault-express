const bcrypt = require('bcrypt');

const saltRounds = 12;

let util = {};

util.encrypt = (plain_password) => {
  return bcrypt.hashSync(plain_password, saltRounds);
};

util.comparePassword = (plain_password, hash_password) => {
  return bcrypt.compareSync(plain_password, hash_password);
};

//pass Buffer object, return Base64 encoded string
util.encodeFile = (buf) => {
  return buf.toString('base64');
};

//pass Base64 encoded string, return Buffer object
util.decodeFile = (encoded_txt) => {
  return Buffer.from(encoded_txt, 'base64');
};

module.exports = util;
