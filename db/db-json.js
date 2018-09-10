const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const file = process.env.DATABASE_URL;

const adapter = new FileAsync(file);
const dblow = low(adapter);

const seed = require('../seed.json');

let db = {};
db.engine = 'lowdb';

//Create user by passing user object, duplicate check, if dup return error object in promise
db.createUser = (user) => {
 return db.findByName(user.username)
  .then(res => {
    if (res) {
      return { error: 'found duplicate'};
    } else {
      return dblow
        .then(d => {
          return d.get('users').push(user).write();
        });
    }
  });
};

//Find user by user_id, if found return an object in promise
db.findById = (id) => {
  return dblow
    .then(d => {
      return d.get('users').find({ id: id }).value();
    });
};

//Find user by username, if found return an object in promise
db.findByName = (name) => {
  return dblow
    .then(d => {
      return d.get('users').find({ username: name }).value();
    });
};

//Update user by passing user object
db.update = (user) => {
  return dblow
    .then(d => {
      return d.get('users').find({id: user.id}).assign(user).write();
    });
};

//Remove user by user_id
db.remove = (id) => {
  return dblow
    .then(d => {
      return d.get('users').remove({ id: id }).write();
    });
};

//Seed data to database by using data in seed.json
db.seed = () => {
  return dblow
    .then(d => {
      return d.set('users', seed).write();
    });
};

module.exports = db;
