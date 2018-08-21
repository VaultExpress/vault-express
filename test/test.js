var assert = require('assert');
describe('This is just for testing the test ;p', function() {
    describe('#indexOf()', function() {
          it('should return -1 when the value is not present', function() {
                  assert.equal([1,2,3].indexOf(4), -1);
                });
        });
});


describe("Encryption Function", 
    uuid => describe("uuidv5 encryption", 
        test_uuid => {
            it("should return the corresponding value for uuidv5 with sitename as a namespace", function(){
                const uuidv5 = require('uuid/v5')
                const VE_NAMESPACE = uuidv5("peaceful-peak-41153.herokuapp.com", uuidv5.DNS)
                assert.equal(uuidv5("Hello World!", VE_NAMESPACE), "9312fccf-890c-58a5-89ed-57a0fcf98596")
            })
        }
    )
)