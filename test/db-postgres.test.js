require('dotenv').config();
const { expect } = require('chai');

let DATABASE_URL = process.env.DATABASE_URL;
let is_postgres = false;
if (DATABASE_URL.indexOf('postgres://') > -1) is_postgres = true;

(is_postgres ? describe : describe.skip)('./db/db-postgres.js', () => {
  let db, seed;
  const user = { id: 'create_user_test', username: 'createUserTest', password: 'password', emails: [{ value: 'test@test.org', type: 'personal' }] };

  before(function() {
    let cfg = require('../config');
    cfg.pg_tablename_prefix = 'vetest_';
    db = require('../db/db-postgres')(DATABASE_URL, cfg);
    seed = require('../seed.json');
  });

  after(function() {
    return db.drop_table()
    .then(res => {
      console.info('after-hook called.');
      return Promise.resolve();
    })
    .catch(err => {
      return Promise.reject(err);
    });
  });

  // seed Method
  describe('seed', () => {
    it('should seed json data to postgresql', async function() {
      this.timeout(10000);
      let result = await db.seed(seed);
      expect(result).to.deep.equal({ success: true });
    });
  });

  // findByName method
  describe('findByName', () => {
    it('should find a specific user by username', async () => {
      let result = await db.findByName(seed[0].username);
      expect(result).to.deep.equal(seed[0]);
    });
  });

  // findById Method
  describe('findById', () => {
    it('should find a specific user by id', async () => {
      let result = await db.findById(seed[0].id);
      expect(result).to.deep.equal(seed[0]);
    });
  });

  // createUser Method
  describe('createUser', () => {
    it('should create an user', async () => {
      let result = await db.createUser(user);
      expect(result).to.deep.equal({ success: true });
    });
    it('should not create an duplicated user', async () => {
      let result = await db.createUser(user);
      expect(result).to.not.deep.equal({ success: true });
      expect(result).to.deep.equal({ found: true });
    });
  });



  // update Method
  describe('update', () => {
    it('should update a specific user by id', async function() {
      let update_user = {
        id: user.id,
        username: 'new name',
        name: { givenName: 'new' },
        emails: [{ type: 'work', value: 'new@test.org' }],
        photos: [{ type: 'profile', value: 'https://image.com?id=1' }],
        info1: 'This is info1'
      };
      let result = await db.update(update_user);
      expect(result.success).to.be.true;
    });
  });

  // remove Method
  describe('remove', () => {
    it('should remove an user by id', async () => {
      let result = await db.remove(user.id);
      expect(result).to.deep.equal({ success: true });
    });
  });

});
