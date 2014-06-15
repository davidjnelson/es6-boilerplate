import {Person} from '../../src/model/Person'

var person;

describe('Person', function() {
    beforeEach(function() {
        person = new Person('firstName', 'lastName');
    });

    it('should return the first and last name', function() {
        expect(person.fullName).toEqual('firstName lastName');
    })
});
