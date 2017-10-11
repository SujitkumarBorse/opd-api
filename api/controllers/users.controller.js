"use strict";

const mongoose = require("mongoose");
const definition = require("../helpers/users.definition.js").definition;
const SMCrud = require("swagger-mongoose-crud");
const cuti = require("cuti");
const schema = new mongoose.Schema(definition);
const logger = global.logger;
var jwt = require('jsonwebtoken');

var options = {
    logger: logger,
    collectionName: "users"
};
schema.pre("save", cuti.counter.getIdGenerator("users", "USER"));

let createToken = function(data) {

    console.log("Data to create after post ");

};

schema.post("save", createToken(this));

var crudder = new SMCrud(schema, "users", options);

var users = mongoose.model('users', schema);


let loginUser = function (_req, _res) {

    console.log("login data", _req.body);
    let data = _req.body;
    if (!data || !data.email || !data.password) {
        return _res.json({ status: 'failed', message: "Username/Password is missing." });
    }
    users.findOne({ "email": data.email, "password": data.password }, (err, user) => {
        if (err) {
            return _res.json({ status: 'failed', message: "Something went wrong. Please tyr again later." });
        };
        if (!user) {
            _res.json({ status: 'failed', message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password != _req.body.password) {
                _res.json({ status: 'failed', message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right, create a token with only our given payload
                // remove password from user before creating token
                delete user['password'];

                // TODO: generate secrete while user register and use it
                var token = jwt.sign(user, 'superSecret', {
                    expiresInMinutes: 1440 // expires in 24 hours
                });
                // return the information including token as JSON
                _res.json({
                    status: 'success',
                    token: token
                });
            }
        }
    });
};


module.exports = {
    create: crudder.create,
    index: crudder.index,
    show: crudder.show,
    destroy: crudder.markAsDeleted,
    update: crudder.update,
    login: loginUser
};
