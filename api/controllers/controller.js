"use strict";
//controllers
const usersController = require("./users.controller.js");
const patientsController = require("./patients.controller.js");

//exports
var exports = {};
exports.v1_usersCreate = usersController.create;
exports.v1_usersList = usersController.index;
exports.v1_usersShow = usersController.show;
exports.v1_usersDestroy = usersController.destroy;
exports.v1_usersUpdate = usersController.update;
exports.v1_loginUser = usersController.login;

exports.v1_patientsCreate = patientsController.create;
exports.v1_patientsList = patientsController.index;
exports.v1_patientsShow = patientsController.show;
exports.v1_patientsDestroy = patientsController.destroy;
exports.v1_patientsUpdate = patientsController.update;

module.exports = exports;
    