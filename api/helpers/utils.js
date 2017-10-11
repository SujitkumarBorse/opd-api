'use strict';
var passwordHash = require('password-hash');

// Create hash key
var hashGeneration = function (key) {
    var hashedPassword = passwordHash.generate(key);
    return hashedPassword;
};

function addHashedPassword() {
    return function (next) {
        var self = this;
        if (!self._id) {
            this.password = hashGeneration(this.password);
            next();
        }
        else {
            next();
        }
    };
}

function cleanResponse() {
    return function (next) {
        var self = this;
        if (self._id) {
            delete this['password'];
            next();
        }
        else {
            next();
        }
    };
}



module.exports.addHashedPassword = addHashedPassword;
module.exports.hashGeneration = hashGeneration;
module.exports.cleanResponse = cleanResponse;