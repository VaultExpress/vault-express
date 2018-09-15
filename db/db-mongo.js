const durl = process.env.DATABASE_URL;

const seed = require('../seed.json');

let db = {};
db.engine = 'mongodb';

//Create user by passing user object, duplicate check, if dup return error object in promise
db.createUser = (user) => {
 return Promise.resolve();
};

//Find user by user_id, if found return an object in promise
db.findById = (id) => {
 return Promise.resolve();
};

//Find user by username, if found return an object in promise
db.findByName = (name) => {
 return Promise.resolve();
};

//Update user by passing user object
db.update = (user) => {
 return Promise.resolve();
};

//Remove user by user_id
db.remove = (id) => {
 return Promise.resolve();
};

//Seed data to database by using data in seed.json
db.seed = () => {
 return Promise.resolve();
};

module.exports = db;
