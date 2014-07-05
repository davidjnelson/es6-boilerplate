## es6-boilerplate

ES6 Boilerplate allows you to use features from the next version of javascript (es6) today, and transpile them to the
current version of javascript (es5) so they run in all browsers.  ES6 modules, AMD modules and global scripts
and libraries all work together, and can be easily built, concatentated, minified, and gzipped along with source
maps to allow you to debug in production while delivering high performance to your users.

ES6 Boilerplate is based off of Vojta Jína's fantastic es6-playground project, which he says is the same his team
at google is using to develop AngularJS version 2.0.


### Initial setup

```bash
# Clone the repo...
git clone https://github.com/davidjnelson/es6-boilerplate.git
cd es6-boilerplate
```

# Then, you need to install all the dependencies...
```bash
npm install
bower install
```

### Running the tests
```bash
karma start
```

### Running in the browser
```bash
gulp build
gulp serve
```

# If you want Gulp to re-build on every change...
```bash
gulp watch
```

### How to load legacy libraries and code from amd modules or from browser globals?
If you have an amd or browser global module, add it to src/runtime-config.js under the paths object.  If it needs to
export a global, add it to the shim object, specifying the module name and the global name it exports.  Whether it's
an amd module or a shimmed browser global, add it to the require call at the bottom of runtime-config.js so that
the build process sees it and concatenates it.

In the following example, the traceur runtime exports a global through the shim, and jquery is loaded as an amd module:
```js
require.config({
    // put both amd and browser global modules here
    paths: {
        assert: '../node_modules/rtts-assert/dist/amd/assert',
        traceur: '../bower_components/traceur-runtime/traceur-runtime',
        jquery: '../bower_components/jquery/dist/jquery'
    },
    // put any browser global modules here
    shim: {
        'traceur': {
            exports: '$traceurRuntime'
        }
    }
});

// put amd and browser global modules here so that the requirejs optimizer knows to concatenate them
require(['traceur', 'jquery'], function() {

});
```

### How to use es6 modules?
To use es6 modules, simple add new files anywhere under the src directory.  The syntax for exporting a module looks like this:

```js
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
export {Person}
```

And the syntax for importing a module looks like this:

```js
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
```

### Where can I learn more about the sweet new es6 features that I can use with this tool?
- Here are all the es6 features supported by traceur: https://github.com/google/traceur-compiler/wiki/LanguageFeatures
- Checkout the 'Bonus Round: Promises and Generators' from this article on promises to see how easy new es6 features
it to work with asynchronous code: http://www.html5rocks.com/en/tutorials/es6/promises


### Current Issues

- Sometimes when a breakpoint is set in a source in the chrome developer tools via the source maps, the tab
does not appear for that source from the map.  You have to click on the file name on the right hand side of the
developer tools ui under the section called 'Call Stack'.  It's not a huge issue, but it would be nice to have fixed
at some point.
- Traceur doesn't support minifying the output file when generating source maps, so at present it concatenates all
the es6 code but doesn't minify it.  This will be addressed soon.  Currently gulp doesn't support a minifier which
can preserve an existing source map.  So a grunt plugin and a gulp to grunt bridge may be used in the interim.
- At present, there isn't any tooling which easily can, or perhaps can at all, load amd or browser global modules
from within an es6 module.  As a result, the built output does two http requests, one to get the minified file which
contains legacy amd and browser global modules, and one which gets the minified file which contains es6 modules.  This
isn't a huge deal to do 2 http requests instead of one.
