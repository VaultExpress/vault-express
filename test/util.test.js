const chai = require('chai');
const chaiBytes = require('chai-bytes');
const fs = require('fs');
const util = require('../util');

chai.use(chaiBytes);
const { expect } = chai;

describe('./util/index.js - Utility functions', () => {
  describe('password hashing functions', () => {
    const txt = 'password12345';
    let hash = '';

    it('should hash plain password', () => {
      hash = util.encrypt(txt);
      expect(hash.length).to.be.equal(60);
    });

    it('should be able to compare plain password with hash', () => {
      expect(util.comparePassword(txt, hash)).to.be.true; // eslint-disable-line
      expect(util.comparePassword('password', hash)).to.be.false; // eslint-disable-line
    });
  });

  describe('File encoding functions', () => {
    const srcBuffer = fs.readFileSync('./public/img/person.png');
    let encodedTxt = '';

    it('should be able to encoding file', () => {
      encodedTxt = util.encodeFile(srcBuffer);
      expect(encodedTxt).is.not.empty; // eslint-disable-line
    });
    it('should be able to decoding file', () => {
      const destBuffer = util.decodeFile(encodedTxt);
      expect(destBuffer).is.not.empty; // eslint-disable-line
      expect(destBuffer).is.equalBytes(srcBuffer);
    });
  });

  describe('User ID generator function', () => {
    const username = 'demo';
    it('should generate an id', () => {
      const id = util.genUserId(username);
      expect(id).is.not.empty; // eslint-disable-line
      expect(id.length).equal(36);
    });
  });
});
