"use strict";

const mongoose = require("mongoose");
const definition = require("../helpers/users.definition.js").definition;
const SMCrud = require("swagger-mongoose-crud");
const cuti = require("cuti");
const schema = new mongoose.Schema(definition);
const logger = global.logger;

var options = {
    logger: logger,
    collectionName: "users"
};
schema.pre("save", cuti.counter.getIdGenerator("users", "USER"));
var crudder = new SMCrud(schema, "users", options);

var users = mongoose.model('users', schema);


let loginUser = function (_req, _res) {
    console.log("login data", _req.body);

    let data = _req.body;

    if (!data || !data.email || !data.password) {
        return _res.json({ status: 'failed', message: "Username/Password is missing." });
    }

    users.findOne({"email" : data.email, "password" : data.password}, (err, user) => {
        if (err) {
            return _res.json({ status: 'failed', message: "Something went wrong. Please tyr again later." });
        }
        if (!user) {
            return _res.json({ status: 'failed', message: "Username/Password does not match." });
        } else {
            // Delete password before returning response
            delete user['password'];
            return _res.json(user);
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
