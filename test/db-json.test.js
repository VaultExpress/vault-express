require('dotenv').config();
const { expect } = require('chai');

let DATABASE_URL = process.env.DATABASE_URL;
let is_json = true;
if ((DATABASE_URL.indexOf('postgres://') > -1) || (DATABASE_URL.indexOf('mongodb://') > -1)) is_json = false;

(is_json ? describe : describe.skip)('./db/db-json.js', () => {
  let file, db, seed;
  const user = { username: 'createUserTest', id: 'create_user_test' };

  before(function() {
    file = 'dbtest.json';
    let cfg = null;
    db = require('../db/db-json')(file,  cfg);
    seed = require('../seed.json');
  });

  after(function() {
    require('fs').unlinkSync(file);
  });

  // seed Method
  describe('seed', () => {
    it('should seed the actual db with sample json file', async () => {
      let result = await db.seed(seed);
      expect(result.users).to.deep.equal(seed);
    });
  });

  // createUser Method
  describe('createUser', () => {
    it('should create an user', async () => {
      let result = await db.createUser(user);
      expect(result).to.include(user);
    });
    it('should not create an duplicated user', async () => {
      let result = await db.createUser(user);
      expect(result).to.not.include(user);
      expect(result).to.deep.equal({ found: true });
    });
  });

  // findById Method
  describe('findById', () => {
    it('should find a specific user by id', async () => {
      let result = await db.findById(user.id);
      expect(result).to.deep.equal(user);
    });
  });

  // findByName method
  describe('findByName', () => {
    it('should find a specific user by username', async () => {
      let result = await db.findByName(user.username);
      expect(result).to.deep.equal(user);
    });
  });

  // update Method
  describe('update', () => {
    it('should update a specific user by id', async () => {
      let update_user = { id: user.id, username: 'new name' };
      let result = await db.update(update_user);
      expect(result).to.deep.equal(update_user);
    });
  });

  // remove Method
  describe('remove', () => {
    it('should remove an user by id', async () => {
      let result = await db.remove(user.id);
      //remove function return removed objects in array if succeed
      expect(result[0]).to.deep.equal(user);
    });
  });

});
