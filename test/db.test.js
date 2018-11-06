require('dotenv').config();
const { expect } = require('chai');
const db = require('../db');

describe('./db/index.js db wrapper functions', () => {
  describe('should implement required functions', () => {
    it('should exist the `engine` var', () => {
      expect(db.engine).to.exist; // eslint-disable-line
      expect(db.engine).to.be.a('string');
    });

    it('should exist the `createUser` method', () => {
      expect(db.createUser).to.exist; // eslint-disable-line
      expect(db.createUser).to.be.a('function');
    });

    it('should exist the `findById` method', () => {
      expect(db.findById).to.exist; // eslint-disable-line
      expect(db.findById).to.be.a('function');
    });

    it('should exist the `findByName` method', () => {
      expect(db.findByName).to.exist; // eslint-disable-line
      expect(db.findByName).to.be.a('function');
    });

    it('should exist the `update` method', () => {
      expect(db.update).to.exist; // eslint-disable-line
      expect(db.update).to.be.a('function');
    });

    it('should exist the `remove` method', () => {
      expect(db.remove).to.exist; // eslint-disable-line
      expect(db.remove).to.be.a('function');
    });

    it('should exist the `seed` method', () => {
      expect(db.seed).to.exist; // eslint-disable-line
      expect(db.seed).to.be.a('function');
    });
  });
});
