require('dotenv').config();

const { Pool } = require('pg');
const fs = require('fs');

module.exports = (DATABASE_URL, cfg) => {
  const con = new Pool({
    connectionString: DATABASE_URL,
    ssl: true,
  });

  const db = {};
  db.engine = 'postgresql';

  const query = (sql, params) => con.connect()
    .then(client => client.query(sql, params)
      .then((res) => {
        client.release();
        return Promise.resolve(res);
      })
      .catch((err) => {
        client.release();
        return Promise.reject(err);
      }));

  const getRelatedData = (user) => {
    if (user) {
      let sqlEmail = `SELECT * FROM ${cfg.pg_tablename_prefix}emails WHERE user_id = 'UID'`;
      let sqlPhoto = `SELECT * FROM ${cfg.pg_tablename_prefix}photos WHERE user_id = 'UID'`;
      sqlEmail = sqlEmail.replace(/UID/g, user.id);

      return query(sqlEmail)
        .then((res) => {
          const clonedUser = { ...user, emails: [] };
          if (res.rows[0]) {
            res.rows.forEach(email => clonedUser.emails.push({
              value: email.email_address,
              type: email.email_type,
            }));
          }

          return clonedUser;
        })
        .then((userResponse) => {
          sqlPhoto = sqlPhoto.replace(/UID/g, user.id);

          return query(sqlPhoto)
            .then((res) => {
              const clonedUser = { ...userResponse, photos: [] };
              if (res.rows[0]) {
                res.rows.forEach(photo => clonedUser.photos.push({
                  value: photo.photo_url,
                  type: photo.photo_type,
                }));
              }

              return clonedUser;
            });
        });
    }

    return user;
  };

  const insertUsers = async (usersData) => {
    try {
      const users = Array.isArray(usersData) ? usersData : [usersData];
      let userValues = '';
      let emailValues = '';
      let photoValues = '';

      users.forEach((user) => {
        if (!user.id || !user.username || !user.password) throw Error('Missing mandatory data');

        const provider = user.provider || 'local';
        const displayName = user.displayName || '';
        const name = user.name || {};
        const givenName = name.givenName || '';
        const middleName = name.middleName || '';
        const familyName = name.familyName || '';
        const info1 = user.info1 || '';
        const info2 = user.info2 || '';
        const info3 = user.info3 || '';
        const info4 = user.info4 || '';
        const info5 = user.info5 || '';
        const userArray = [
          user.id,
          user.username,
          user.password,
          provider,
          displayName,
          givenName,
          middleName,
          familyName,
          info1,
          info2,
          info3,
          info4,
          info5,
        ];
        const separator = ',';
        userValues += `('${userArray.join(`'${separator}'`)}'),`;

        if (user.emails) {
          user.emails.forEach((email) => {
            const type = email.type || '';
            const value = email.value || '';
            const emailArray = [user.id, type, value];
            emailValues += `('${emailArray.join(`'${separator}'`)}'),`;
          });
        }

        if (user.photos) {
          user.photos.forEach((photo) => {
            const type = photo.type || '';
            const value = photo.value || '';
            const photoArray = [user.id, type, value];
            photoValues += `('${photoArray.join(`'${separator}'`)}'),`;
          });
        }
      });

      const sqlUsers = `INSERT INTO ${cfg.pg_tablename_prefix}users (
          id, username, password, provider, display_name, given_name, middle_name, family_name, info1, info2, info3, info4, info5
        ) VALUES ${userValues.slice(0, -1)}`;
      await query(sqlUsers);

      if (emailValues) {
        const sqlEmails = `INSERT INTO ${cfg.pg_tablename_prefix}emails (user_id, email_type, email_address) VALUES ${emailValues.slice(0, -1)}`;
        await query(sqlEmails);
      }

      if (photoValues) {
        const sqlPhotos = `INSERT INTO ${cfg.pg_tablename_prefix}photos (user_id, photo_type, photo_url ) VALUES ${photoValues.slice(0, -1)}`;
        await query(sqlPhotos);
      }

      return { success: true };
    } catch (err) {
      return Promise.reject(err);
    }
  };

  // Create user by passing user object, duplicate check, if dup return error object in promise
  db.createUser = user => db.findByName(user.username)
    .then(res => (res ? { found: true } : insertUsers(user)));

  // Find user by user_id, if found return an object in promise
  db.findById = (id) => {
    const sql = `SELECT * FROM ${cfg.pg_tablename_prefix}users WHERE id = '${id}'`;
    return query(sql)
      .then((res) => {
        const user = res.rows[0];
        if (user) {
          user.displayName = user.display_name;
          user.name = {
            givenName: user.given_name,
            middleName: user.middle_name,
            familyName: user.family_name,
          };
          delete user.given_name;
          delete user.middle_name;
          delete user.family_name;
          delete user.display_name;
        }
        return user;
      })
      .then(user => getRelatedData(user));
  };

  // Find user by username, if found return an object in promise
  db.findByName = (name) => {
    const sql = `SELECT * FROM ${cfg.pg_tablename_prefix}users WHERE username = '${name}'`;

    return query(sql)
      .then((res) => {
        const user = res.rows[0];
        if (user) {
          user.displayName = user.display_name;
          user.name = {
            givenName: user.given_name,
            middleName: user.middle_name,
            familyName: user.family_name,
          };
          delete user.given_name;
          delete user.middle_name;
          delete user.family_name;
          delete user.display_name;
        }
        return user;
      })
      .then(user => getRelatedData(user));
  };

  // Update user by passing user object
  db.update = (user) => {
    if (!user.id) throw Error('missing mandatory data');
    const parsedUser = JSON.parse(JSON.stringify(user));
    const parsedEmails = user.emails ? JSON.parse(JSON.stringify(user.emails)) : [];
    const parsedPhotos = user.photos ? JSON.parse(JSON.stringify(user.photos)) : [];

    delete parsedUser.id;
    delete parsedUser.name;
    delete parsedUser.emails;
    delete parsedUser.photos;

    if (user.name) {
      if (user.name.givenName) parsedUser.given_name = user.name.givenName;
      if (user.name.middleName) parsedUser.middle_name = user.name.middleName;
      if (user.name.familyName) parsedUser.family_name = user.name.familyName;
    }

    const sqlArray = [];
    const userArray = [`UPDATE ${cfg.pg_tablename_prefix}users SET`];
    const userSet = [];

    Object.keys(parsedUser).forEach(key => userSet.push(`${key} = '${(parsedUser[key] || '')}'`));

    userArray.push(userSet.join(', '));
    userArray.push(`WHERE id = '${user.id}';`);
    sqlArray.push(userArray.join(' '));

    if (parsedEmails.length) {
      parsedEmails.forEach((email) => {
        const emailArray = [`UPDATE ${cfg.pg_tablename_prefix}emails SET`];

        emailArray.push(`email_address = '${(email.value || '')}'`);
        emailArray.push(`WHERE user_id = '${user.id}'`);
        emailArray.push(`AND email_type = '${(email.type || '')}';`);

        sqlArray.push(emailArray.join(' '));
      });
    }

    if (parsedPhotos.length) {
      parsedPhotos.forEach((photo) => {
        const photoArray = [`UPDATE ${cfg.pg_tablename_prefix}photos SET`];
        photoArray.push(`photo_url = '${(photo.value || '')}'`);
        photoArray.push(`WHERE user_id = '${user.id}'`);
        photoArray.push(`AND photo_type = '${(photo.type || '')}';`);

        sqlArray.push(photoArray.join(' '));
      });
    }

    const sql = sqlArray.join(' ');
    return query(sql.slice(0, -1))
      .then(() => ({ success: true }));
  };

  // Remove user by user_id
  db.remove = (id) => {
    const sql = `
      DELETE FROM ${cfg.pg_tablename_prefix}photos WHERE user_id = '${id}';
      DELETE FROM ${cfg.pg_tablename_prefix}emails WHERE user_id = '${id}';
      DELETE FROM ${cfg.pg_tablename_prefix}users WHERE id = '${id}';
    `;
    return query(sql)
      .then(() => ({ success: true }))
      .catch(err => Promise.reject(err));
  };

  const isTableExist = async () => {
    try {
      const sql = `SELECT EXISTS (SELECT table_name FROM information_schema.tables WHERE table_name like '${cfg.pg_tablename_prefix}%')`;
      const res = await query(sql);
      return res.rows[0].exists;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const createTable = async () => {
    try {
      let sql = fs.readFileSync('./sql/create.sql').toString();
      sql = sql.replace(/VE_/g, cfg.pg_tablename_prefix);
      await query(sql);
      return { success: true };
    } catch (err) {
      return Promise.reject(err);
    }
  };

  // Seed data to database by using data in seed.json
  db.seed = async (seed) => {
    try {
      const found = await isTableExist();
      if (found) {
        console.log(`Found tables with prefix ${cfg.pg_tablename_prefix} in database \n Please drop those tables and try again`); // eslint-disable-line no-console
        return 'Stop seeding, table already exist.';
      }

      await createTable();
      await insertUsers(seed);
      return { success: true };
    } catch (err) {
      return Promise.reject(err);
    }
  };

  db.drop_table = async () => {
    try {
      const found = await isTableExist();
      if (found) {
        let sql = fs.readFileSync('./sql/drop.sql').toString();
        sql = sql.replace(/VE_/g, cfg.pg_tablename_prefix);
        await query(sql);
        console.info('Drop executed.'); // eslint-disable-line no-console
        return { success: true };
      }

      console.info('Table does not exist.'); // eslint-disable-line no-console
      return { not_found: true };
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return db;
};
