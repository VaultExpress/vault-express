const { expect } = require('chai');
const db = require('../db/db-json');
const seed = require('../seed.json');

describe('DB Json', () => {
  // smoke tests
  describe('smoke tests', () => {
    it('should exist the `createUser` method', () => {
      expect(db.createUser).to.exist;
      expect(db.createUser).to.be.a('function');
    });

    it('should exist the `findById` method', () => {
      expect(db.findById).to.exist;
      expect(db.findById).to.be.a('function');
    });

    it('should exist the `findByName` method', () => {
      expect(db.findByName).to.exist;
      expect(db.findByName).to.be.a('function');
    });

    it('should exist the `update` method', () => {
      expect(db.update).to.exist;
      expect(db.update).to.be.a('function');
    });

    it('should exist the `remove` method', () => {
      expect(db.remove).to.exist;
      expect(db.remove).to.be.a('function');
    });

    it('should exist the `seed` method', () => {
      expect(db.seed).to.exist;
      expect(db.seed).to.be.a('function');
    });
  });

  // createUser Method
  describe('createUser', () => {
    it('should create an user', () => {
      const user = { username: 'test by mocha', user_id: 'testbymocha' };
      expect(db.createUser(user)).to.include(user);
    });
  });

  // findById Method
  describe('findById', () => {
    it('should find a specific user by user_id', () => {
      const user = { username: 'test by mocha', user_id: 'testbymocha' };
      expect(db.findById(user.user_id)).to.deep.equal(user);
    });
  });

  // findByName method
  describe('findByName', () => {
    it('should find a specific user by username', () => {
      const user = { username: 'test by mocha', user_id: 'testbymocha' };
      expect(db.findByName(user.username)).to.deep.equal(user);
    });
  });

  // update Method
  describe('update', () => {
    it('should update a specific user by user_id', () => {
      const user = { username: 'test by mocha updated', user_id: 'testbymocha' };
      expect(db.update(user)).to.deep.equal(user);
    });
  });

  // remove Method
  describe('remove', () => {
    it('should remove an user by user_id', () => {
      const user = { username: 'test by mocha', user_id: 'testbymocha' };
      expect(db.remove(user.user_id)).to.not.include(user);
    });
  });

  // seed Method
  describe('seed', () => {
    it('should seed the actual db with sample json file', () => {
      expect(db.seed().users).to.deep.equal(seed);
    });
  });
});
