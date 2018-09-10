require('dotenv').config();
const { expect } = require('chai');

let env = process.env;
process.env = { DATABASE_URL: "dbtest.json" };

const db = require('../db/db-json');
const seed = require('../seed.json');
const fs = require('fs');

describe('./db/db-json.js', () => {

  const user = { username: 'createUserTest', id: 'create_user_test' };

  after(function() {
    fs.unlinkSync(process.env.DATABASE_URL);
    process.env = env;
  });

  // seed Method
  describe('seed', () => {
    it('should seed the actual db with sample json file', async () => {
      let result = await db.seed();
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
      expect(result).to.deep.equal({ error: 'found duplicate'});
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
