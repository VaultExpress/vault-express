const bcrypt = require('bcrypt');
const cfg = require('../config');
const uuid = require('./util.uuidv5');

const util = {};

util.encrypt = plainPassword => bcrypt
  .hashSync(plainPassword, cfg.password_hash_salt_rounds);

util.comparePassword = (plainPassword, hashPassword) => bcrypt
  .compareSync(plainPassword, hashPassword);

// Pass Buffer object, return Base64 encoded string
util.encodeFile = buf => buf
  .toString('base64');

// Pass Base64 encoded string, return Buffer object
util.decodeFile = encodedTxt => Buffer
  .from(encodedTxt, 'base64');

// Pass username, return uuid
util.genUserId = username => uuid.uuidv5(username);

module.exports = util;
