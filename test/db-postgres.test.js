require('dotenv').config();
const { expect } = require('chai');
const dbPostgres = require('../db/db-postgres');
const mock = require('../seed.json');
const config = require('../config');

const { DATABASE_URL } = process.env;
const isPostgres = DATABASE_URL.indexOf('postgres://') > -1;

(isPostgres ? describe : describe.skip)('./db/db-postgres.js', () => {
  let db;
  let seed;
  const user = {
    id: 'create_user_test',
    username: 'createUserTest',
    password: 'password',
    emails: [{ value: 'test@test.org', type: 'personal' }],
  };

  before(() => {
    const cfg = config;
    cfg.pg_tablename_prefix = 'vetest_';
    db = dbPostgres(DATABASE_URL, cfg);
    seed = mock;
  });

  after(() => db.drop_table()
    .then(() => {
      console.info('after-hook called.'); // eslint-disable-line no-console
      return Promise.resolve();
    })
    .catch(err => Promise.reject(err)));

  // seed Method
  describe('seed', () => {
    /* eslint-disable */
    it('should seed json data to postgresql', async function() {
      this.timeout(10000);
      const result = await db.seed(seed);
      expect(result).to.deep.equal({ success: true });
    });
    /* eslint-enable */
  });

  // findByName method
  describe('findByName', () => {
    it('should find a specific user by username', async () => {
      const result = await db.findByName(seed[0].username);
      expect(result).to.deep.equal(seed[0]);
    });
  });

  // findById Method
  describe('findById', () => {
    it('should find a specific user by id', async () => {
      const result = await db.findById(seed[0].id);
      expect(result).to.deep.equal(seed[0]);
    });
  });

  // createUser Method
  describe('createUser', () => {
    it('should create an user', async () => {
      const result = await db.createUser(user);
      expect(result).to.deep.equal({ success: true });
    });

    it('should not create an duplicated user', async () => {
      const result = await db.createUser(user);
      expect(result).to.not.deep.equal({ success: true });
      expect(result).to.deep.equal({ found: true });
    });
  });

  // update Method
  describe('update', () => {
    it('should update a specific user by id', async () => {
      const updateUser = {
        id: user.id,
        username: 'new name',
        name: { givenName: 'new' },
        emails: [{ type: 'work', value: 'new@test.org' }],
        photos: [{ type: 'profile', value: 'https://image.com?id=1' }],
        info1: 'This is info1',
      };
      const result = await db.update(updateUser);
      expect(result.success).to.be.true; // eslint-disable-line
    });
  });

  // remove Method
  describe('remove', () => {
    it('should remove an user by id', async () => {
      const result = await db.remove(user.id);
      expect(result).to.deep.equal({ success: true });
    });
  });
});
