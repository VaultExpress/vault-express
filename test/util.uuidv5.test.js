require('dotenv')
    .config();

var assert = require('assert');

const uuidv5 = require("uuid/v5")

const ve_util_uuidv5 = require("../util/util.uuidv5")

describe("./util/util.uuidv5.js -- uuid functions",
    uuid => describe("uuidv5 generation",
        test_uuid => {
            
            it("should return the corresponding namespace from the environment", function() {
                assert.notEqual(ve_util_uuidv5._environmentNameSpace(), undefined)
            })
            
            it("should construct environment namespace", function() {
                assert.notEqual(ve_util_uuidv5._constructNameSpace(), undefined)
            })
            
            it("environment namespace should be 16 bytes in length", function() {
                assert.notEqual(ve_util_uuidv5._constructNameSpace().length, 16)
            })

            it("should return the corresponding value for uuidv5 with sitename as a namespace", function(){
                assert.equal(ve_util_uuidv5.uuidv5("Hello World!"), uuidv5("Hello World!", ve_util_uuidv5._constructNameSpace()))
            })
        }
    )
)
