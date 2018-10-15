// Describe tests
const assert = require('assert');
const Mushroom = ('../models/mushrooms.js');

describe('Saving records', function () {

    // Create tests
    it('Saves a record to the database', function (done) {

        var char = new Mushroom({
            nick: 'Ksenia',
            filename: 'unicorn.jpg'
        });

        // saving to the database and to mushrooms collection
        // asynchroniczne, dodajemy promise .then()
        char.save().then( function() {
            assert(char.isNew === false); // true or false. False, ponieważ nie jest nowy - jest zapisany
            done();
        });
    })

});
