const { expect } = require('chai')
  .use(require('chai-bytes'));
const util = require('../util');
const fs = require('fs');

describe("./util/index.js - Utility functions", () => {
  describe("password encrypt functions", () => {
    let txt = 'demo1';
    let hash = "";

    it("should encrypt plain password", () => {
      hash = util.encrypt(txt);
      expect(hash.length).to.be.equal(60);
    });

    it("should compare plain password with hash", () => {
      expect(util.comparePassword(txt, hash)).to.be.true;
      expect(util.comparePassword("password", hash)).to.be.false;
    });
  });

  describe("File encoding functions", () => {
    let encoded_txt = "";
    let srcBuffer = fs.readFileSync("./static/img/person.png");
    it("should be able to encoding file", () => {
      encoded_txt = util.encodeFile(srcBuffer);
      expect(encoded_txt).is.not.empty;
    });
    it("should be able to decoding file", () => {
      let destBuffer = util.decodeFile(encoded_txt);
      expect(destBuffer).is.not.empty;
      expect(destBuffer).is.equalBytes(srcBuffer);
    });
  });
});


