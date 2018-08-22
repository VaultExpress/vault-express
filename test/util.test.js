const { expect } = require('chai');
const util = require('../util');

let txt = 'password12345';
let hash = "";

describe("./util/index.js - Utility functions", () => {
  describe("password encrypt functions", () => {
    it("should encrypt plain password", () => {
      hash = util.encrypt(txt);
      expect(hash.length).to.be.equal(60);
    });

    it("should compare plain password with hash", () => {
      expect(util.comparePassword(txt, hash)).to.be.true;
      expect(util.comparePassword("password", hash)).to.be.false;
    });
  });
});


