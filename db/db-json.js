const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

module.exports = function(DATABASE_URL, cfg) {
  const adapter = new FileAsync(DATABASE_URL);
  const dblow = low(adapter);

  let db = {};
  db.engine = 'lowdb';

  //Create user by passing user object, duplicate check, if dup return json object with error message
  db.createUser = (user) => {
    return db.findByName(user.username)
    .then(res => {
      if (res) {
        return { found: true };
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

  //Seed json object from paramater to database
  db.seed = (seed) => {
    return dblow
    .then(d => {
      return d.set('users', seed).write();
    });
  };
  return db;
};


