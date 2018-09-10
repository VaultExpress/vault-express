const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const file = process.env.DATABASE_URL;

const adapter = new FileSync(file);
const dblow = low(adapter);

const seed = require('../seed.json');

let db = {};
db.engine = 'lowdb';

//Create user by passing user object, duplicate check, if dup return null
db.createUser = (user) => {
  let res = db.findByName(user.username);
  if (res) {
    return null;
  } else {
    return dblow.get('users').push(user).write();
  }
};

//Find user by user_id, if found return an object
db.findById = (id) => {
  return dblow.get('users').find({ user_id: id }).value();
};

//Find user by username, if found return an object
db.findByName = (name) => {
  return dblow.get('users').find({ username: name }).value();
};

//Update user by passing user object
db.update = (user) => {
  return dblow.get('users').find({user_id: user.user_id}).assign(user).write();
};

//Remove user by user_id
db.remove = (id) => {
  return dblow.get('users').remove({ user_id: id }).write();
};

//Seed data to database by using data in seed.json
db.seed = () => {
  return dblow.set('users', seed).write();
};

module.exports = db;
