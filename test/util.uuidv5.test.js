require('dotenv').config();
const assert = require('assert');
const uuidv5 = require('uuid/v5');
const veUtilUuidv5 = require('../util/util.uuidv5');

describe('./util/util.uuidv5.js -- uuid functions', () => {
  describe('uuidv5 generation', () => {
    it('should return the corresponding namespace from the environment', () => {
      assert.notEqual(veUtilUuidv5.environmentNameSpace(), undefined);
    });

    it('should construct environment namespace', () => {
      assert.notEqual(veUtilUuidv5.constructNameSpace(), undefined);
    });

    it('environment namespace should be 16 bytes in length', () => {
      assert.notEqual(veUtilUuidv5.constructNameSpace().length, 16);
    });

    it('should return the corresponding value for uuidv5 with sitename as a namespace', () => {
      assert.equal(veUtilUuidv5.uuidv5('Hello World!'), uuidv5('Hello World!', veUtilUuidv5.constructNameSpace()));
    });
  });
});
