import {Person} from './model/Person';

var person = new Person('firstName', 'lastName');

$('body').append('person\'s name is: ' + person.fullName);