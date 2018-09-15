require('dotenv').config();

const { Pool } = require('pg');
const seed = require('../seed.json');
const fs = require('fs');

module.exports = function(DATABASE_URL, cfg) {
  const con = new Pool({
    connectionString: DATABASE_URL,
    ssl: true,
  });

  let db = {};
  db.engine = 'postgresql';

  //Create user by passing user object, duplicate check, if dup return error object in promise
  db.createUser = (user) => {
    return db.findByName(user.username)
    .then(res => {
      if (res) {
        return { found: true };
      } else {
        return insert_users(user);
      }
    });
  };

  //Find user by user_id, if found return an object in promise
  db.findById = (id) => {
    let sql = 'SELECT * FROM ' + cfg.pg_tablename_prefix + 'users WHERE id = \'' + id + '\'';
    return query(sql)
      .then(res => {
        let user = res.rows[0];
        if (user) {
          user.displayName = user.display_name;
          user.name = {
            givenName: user.given_name,
            middleName: user.middle_name,
            familyName: user.family_name
          };
          delete user['given_name'];
          delete user['middle_name'];
          delete user['family_name'];
          delete user['display_name'];
        }
        return user;
      })
      .then(user => {
        return get_related_data(user);
      });
  };

  //Find user by username, if found return an object in promise
  db.findByName = (name) => {
    let sql = 'SELECT * FROM ' + cfg.pg_tablename_prefix + 'users WHERE username = \'' + name + '\'';
    return query(sql)
      .then(res => {
        let user = res.rows[0];
        if (user) {
          user.displayName = user.display_name;
          user.name = {
            givenName: user.given_name,
            middleName: user.middle_name,
            familyName: user.family_name
          };
          delete user['given_name'];
          delete user['middle_name'];
          delete user['family_name'];
          delete user['display_name'];
        }
        return user;
      })
      .then(user => {
        return get_related_data(user);
      });
  };

  //Update user by passing user object
  db.update = (user) => {
    if (!user.id) throw Error('missing mandatory data');
    let u = JSON.parse(JSON.stringify(user));
    let e = user.emails?JSON.parse(JSON.stringify(user.emails)):[];
    let p = user.photos?JSON.parse(JSON.stringify(user.photos)):[];
    delete u['id'];
    delete u['name'];
    delete u['emails'];
    delete u['photos'];
    if (user.name) {
      if (user.name.givenName) u['given_name'] = user.name.givenName;
      if (user.name.middleName) u['middle_name'] = user.name.middleName;
      if (user.name.familyName) u['family_name'] = user.name.familyName;
    }
    let sql_array = [];

    let user_array = ['UPDATE ' + cfg.pg_tablename_prefix + 'users SET'];
    let user_set = [];
    Object.keys(u).forEach(function (key, i) {
      user_set.push(key + ' = \'' + (u[key]||'') + '\'');
    });
    user_array.push(user_set.join(', '));
    user_array.push('WHERE id = \''+user.id+'\';');
    sql_array.push(user_array.join(' '));

    if (e.length) {
      for (let i = 0, len = e.length; i < len; i++) {
        let email_array = ['UPDATE ' + cfg.pg_tablename_prefix + 'emails SET'];
        email_array.push('email_address = \'' + (e[i].value||'') + '\'');
        email_array.push('WHERE user_id = \'' + user.id + '\'');
        email_array.push('AND email_type = \'' + (e[i].type||'') + '\';');

        sql_array.push(email_array.join(' '));
      }
    }

    if (p.length) {
      for (let i = 0, len = p.length; i < len; i++) {
        let photo_array = ['UPDATE ' + cfg.pg_tablename_prefix + 'photos SET'];
        photo_array.push('photo_url = \'' + (p[i].value||'') + '\'');
        photo_array.push('WHERE user_id = \'' + user.id + '\'');
        photo_array.push('AND photo_type = \'' + (p[i].type||'') + '\';');

        sql_array.push(photo_array.join(' '));
      }
    }
    let sql = sql_array.join(' ');
console.log(sql);
    return query(sql.slice(0, -1))
    .then(res => {
      return { success: true };
    });

  };

  //Remove user by user_id
  db.remove = (id) => {
    let sql = 'DELETE FROM ' + cfg.pg_tablename_prefix + 'photos WHERE user_id = \'' + id + '\';';
    sql += 'DELETE FROM ' + cfg.pg_tablename_prefix + 'emails WHERE user_id = \'' + id + '\';';
    sql += 'DELETE FROM ' + cfg.pg_tablename_prefix + 'users WHERE id = \'' + id + '\';';
    return query(sql)
    .then(res => {
      return { success: true };
    })
    .catch(err => {
      return Promise.reject(err);
    });
  };

  //Seed data to database by using data in seed.json
  db.seed = async (seed) => {
    try {
      let found = await is_table_exist();
      if (found) {
        console.log('found tables with prefix "' + cfg.pg_tablename_prefix + '" in database');
        console.log('please drop those tables and try again');
        return 'stop seeding, table already exist.';
      } else {
        await create_table();
        await insert_users(seed);
        return { success: true };
      }
    } catch(err) {
      return Promise.reject(err);
    }
  };

  db.drop_table = async () => {
    try {
      let found = await is_table_exist();
      if (found) {
        let sql = fs.readFileSync('./sql/drop.sql').toString();
        sql = sql.replace(/VE_/g, cfg.pg_tablename_prefix);
        let res = await query(sql);
        console.info('drop executed.');
        return { success: true };
      } else {
        console.info('table does not exist.');
        return { not_found: true };
      }
    } catch(err) {
      return Promise.reject(err);
    }
  };

  const is_table_exist = async () => {
    try {
      let sql = 'SELECT EXISTS (SELECT table_name FROM information_schema.tables WHERE table_name like \'' + cfg.pg_tablename_prefix + '%\')';
      let res = await query(sql);
      if (res.rows[0].exists) {
        return true;
      } else {
        return false;
      }
    } catch(err) {
      return Promise.reject(err);
    }
  };

  const create_table = async () => {
    try {
      let sql = fs.readFileSync('./sql/create.sql').toString();
      sql = sql.replace(/VE_/g, cfg.pg_tablename_prefix);
      let res = await query(sql);
      return { success: true };
    } catch(err) {
      return Promise.reject(err);
    }
  };

  const get_related_data = (user) => {
    if (user) {
      let sql_email = 'SELECT * FROM ' + cfg.pg_tablename_prefix + 'emails WHERE user_id = \'UID\'';
      let sql_photo = 'SELECT * FROM ' + cfg.pg_tablename_prefix + 'photos WHERE user_id = \'UID\'';
      sql_email = sql_email.replace(/UID/g, user.id);
      return query(sql_email)
        .then(res => {
          user.emails = [];
          if (res.rows[0]) {
            for (let i = 0, len = res.rows.length; i < len; i++) {
              user.emails.push({
                value: res.rows[i].email_address,
                type: res.rows[i].email_type
              });
            }
          }
          return user;
        })
        .then(user => {
          sql_photo = sql_photo.replace(/UID/g, user.id);
          return query(sql_photo)
          .then(res => {
            user.photos = [];
            if (res.rows[0]) {
              for (let i = 0, len = res.rows.length; i < len; i++) {
                user.photos.push({
                  value: res.rows[i].photo_url,
                  type: res.rows[i].photo_type
                });
              }
            }
            return user;
          });
        });
    } else {
      return user;
    }
  }

  const insert_users = async (users) => {
    try {
      users = Array.isArray(users)?users:[users];
      let user_values = '', email_values = '', photo_values = '';
      for (let i = 0, len = users.length; i < len; i++) {
        if (!users[i].id || !users[i].username || !users[i].password) throw Error('missing mandatory data');
        let provider = users[i].provider || 'local';
        let displayName = users[i].displayName || '';
        if (!users[i].name) users[i].name = '';
        let givenName = users[i].name.givenName || '';
        let middleName = users[i].name.middleName || '';
        let familyName = users[i].name.familyName || '';
        let info1 = users[i].info1 || '';
        let info2 = users[i].info2 || '';
        let info3 = users[i].info3 || '';
        let info4 = users[i].info4 || '';
        let info5 = users[i].info5 || '';
        let user_array = [users[i].id, users[i].username, users[i].password, provider,
          displayName, givenName, middleName, familyName, info1, info2, info3, info4, info5];
        user_values += '(\''+user_array.join('\',\'')+'\'),';

        if (users[i].emails) {
          for (let j = 0, lenj = users[i].emails.length; j < lenj; j++) {
            let type = users[i].emails[j].type || '';
            let value = users[i].emails[j].value || '';
            let email_array = [users[i].id, type, value];
            email_values += '(\''+email_array.join('\',\'')+'\'),';
          }
        }

        if (users[i].photos) {
          for (let k = 0, lenk = users[i].photos.length; k < lenk; k++) {
            let type = users[i].photos[k].type || '';
            let value = users[i].photos[k].value || '';
            let photo_array = [users[i].id, type, value];
            photo_values += '(\''+photo_array.join('\',\'')+'\'),';
          }
        }
      }

      let sql_users = 'INSERT INTO ' + cfg.pg_tablename_prefix + 'users (' +
          'id, username, password, provider, display_name, given_name, middle_name, family_name, ' +
          'info1, info2, info3, info4, info5) VALUES ' + user_values.slice(0, -1);
      await query(sql_users);

      if (email_values)  {
        let sql_emails = 'INSERT INTO '+cfg.pg_tablename_prefix+'emails (user_id, email_type, email_address) VALUES '+email_values.slice(0,-1);
        await query(sql_emails);
      }
      if (photo_values) {
        let sql_photos = 'INSERT INTO '+cfg.pg_tablename_prefix+'photos (user_id, photo_type, photo_url ) VALUES '+photo_values.slice(0,-1);
        await query(sql_photos);
      }
      return { success: true };
    } catch(err) {
      return Promise.reject(err);
    }
  }

  const query = (sql, params) => con.connect()
  .then(client =>
    client.query(sql, params)
    .then(res => {
      client.release();
      return Promise.resolve(res);
    })
    .catch(err => {
      client.release();
      return Promise.reject(err);
    })
  );

  return db;
};
