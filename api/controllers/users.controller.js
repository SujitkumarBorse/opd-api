"use strict";

const mongoose = require("mongoose");
const definition = require("../helpers/users.definition.js").definition;
const SMCrud = require("swagger-mongoose-crud");
const cuti = require("cuti");
const schema = new mongoose.Schema(definition);
const logger = global.logger;
var jwt = require('jsonwebtoken');
var utils = require('../helpers/utils');
var options = {
    logger: logger,
    collectionName: "users"
};
schema.pre("save", cuti.counter.getIdGenerator("users", "USER"));
// schema.pre("save", utils.addHashedPassword());
// schema.post("save", utils.cleanResponse());


var crudder = new SMCrud(schema, "users", options);

var users = mongoose.model('users', schema);


let loginUser = function (_req, _res) {

    let data = _req.body;
    if (!data || !data.email || !data.password) {
        return _res.json({ status: 'failed', message: "Username/Password is missing." });
    }
    // let hashedPassword = utils.hashGeneration(data.password);
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

                let data = {
                    "_id": user._id,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "gender": user.gender,
                    "medicalRegistrationNo": user.medicalRegistrationNo
                };

                // TODO: generate secrete while user register and use it
                var token = jwt.sign(data, 'superSecret', {
                    expiresIn: 1440 // expires in 24 hours
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


var changePassword = function (_req, _res) {

    let data = _req.body;

    if (!data || (!data.email || !data._id) || !data.currentPassword || !data.newPassword) {
        return _res.json({ status: 'failed', message: "Data missing for change password." });
    }
    var query;
    if (data && data._id) {
        query = { "_id": data._id, "password": data.currentPassword };
    } else if (data && data.email) {
        query = { "email": data.email, "password": data.currentPassword }
    } else {
        return _res.json({ status: 'failed', message: "Something went wrong. Please tyr again later." });
    }
    users.update(query, { $set: { "password": data.newPassword } }, (err, user) => {
        if (err) {
            return _res.json({ status: 'failed', message: "Something went wrong. Please tyr again later." });
        };
        if (user.nModified === 0) {
            _res.json({ status: 'failed', message: 'Details not matched to change password.' });
        } else {
            _res.json({ status: 'success', message: 'Password changed successfully.' });
        }
    });

}

module.exports = {
    create: crudder.create,
    index: crudder.index,
    show: crudder.show,
    destroy: crudder.markAsDeleted,
    update: crudder.update,
    login: loginUser,
    changePassword: changePassword
};
