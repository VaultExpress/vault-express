const db = {};
db.engine = 'mongodb';

// Create user by passing user object, duplicate check, if dup return error object in promise
db.createUser = (/* user */) => Promise.resolve();

// Find user by user_id, if found return an object in promise
db.findById = (/* id */) => Promise.resolve();

// Find user by username, if found return an object in promise
db.findByName = (/* name */) => Promise.resolve();

// Update user by passing user object
db.update = (/* user */) => Promise.resolve();

// Remove user by user_id
db.remove = (/* id */) => Promise.resolve();

// Seed data to database by using data in seed.json
db.seed = () => Promise.resolve();

module.exports = db;
