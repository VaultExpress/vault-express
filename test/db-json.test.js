require('dotenv').config();
const { expect } = require('chai');
const fs = require('fs');
const dbJson = require('../db/db-json');
const mock = require('../seed.json');

const { DATABASE_URL } = process.env;
const isJson = !(DATABASE_URL.indexOf('postgres://') > -1) || (DATABASE_URL.indexOf('mongodb://') > -1);

(isJson ? describe : describe.skip)('./db/db-json.js', () => {
  let file;
  let db;
  let seed;
  const user = { username: 'createUserTest', id: 'create_user_test' };

  before(() => {
    file = 'dbtest.json';
    const cfg = null;
    db = dbJson(file, cfg);
    seed = mock;
  });

  after(() => fs.unlinkSync(file));

  // seed Method
  describe('seed', () => {
    it('should seed the actual db with sample json file', async () => {
      const result = await db.seed(seed);
      expect(result.users).to.deep.equal(seed);
    });
  });

  // createUser Method
  describe('createUser', () => {
    it('should create an user', async () => {
      const result = await db.createUser(user);
      expect(result).to.include(user);
    });
    it('should not create an duplicated user', async () => {
      const result = await db.createUser(user);
      expect(result).to.not.include(user);
      expect(result).to.deep.equal({ found: true });
    });
  });

  // findById Method
  describe('findById', () => {
    it('should find a specific user by id', async () => {
      const result = await db.findById(user.id);
      expect(result).to.deep.equal(user);
    });
  });

  // findByName method
  describe('findByName', () => {
    it('should find a specific user by username', async () => {
      const result = await db.findByName(user.username);
      expect(result).to.deep.equal(user);
    });
  });

  // update Method
  describe('update', () => {
    it('should update a specific user by id', async () => {
      const updateUser = { id: user.id, username: 'new name' };
      const result = await db.update(updateUser);
      expect(result).to.deep.equal(updateUser);
    });
  });

  // remove Method
  describe('remove', () => {
    it('should remove an user by id', async () => {
      const result = await db.remove(user.id);
      // remove function return removed objects in array if succeed
      expect(result[0]).to.deep.equal(user);
    });
  });
});
