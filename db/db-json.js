const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

module.exports = (DATABASE_URL) => {
  const adapter = new FileAsync(DATABASE_URL);
  const dblow = low(adapter);

  const db = {};
  db.engine = 'lowdb';

  // Create user by passing user object, if dup return JSON object with error messsage
  db.createUser = user => db.findByName(user.username)
    .then((res) => {
      if (res) return { found: true };
      return dblow
        .then(d => d.get('users').push(user).write());
    });

  // Find user by user_id, if found return an object in promise
  db.findById = id => dblow
    .then(d => d.get('users').find({ id }).value());

  // Find user by username, if found return an object in promise
  db.findByName = name => dblow
    .then(d => d.get('users').find({ username: name }).value());

  // Update user by passing user object
  db.update = user => dblow
    .then(d => d.get('users').find({ id: user.id }).assign(user).write());

  // Remove user by user_id
  db.remove = id => dblow
    .then(d => d.get('users').remove({ id }).write());

  // Seed json object from paramater to database
  db.seed = seed => dblow
    .then(d => d.set('users', seed).write());

  return db;
};
