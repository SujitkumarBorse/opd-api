"use strict";
//controllers
const usersController = require("./users.controller.js");
const patientsController = require("./patients.controller.js");
const appointmentsController = require("./appointments.controller.js");
const billingController = require("./billing.controller.js");

//exports
var exports = {};
// User
exports.v1_usersCreate = usersController.create;
exports.v1_usersList = usersController.index;
exports.v1_usersShow = usersController.show;
exports.v1_usersDestroy = usersController.destroy;
exports.v1_usersUpdate = usersController.update;
exports.v1_loginUser = usersController.login;

// Patient
exports.v1_patientsCreate = patientsController.create;
exports.v1_patientsList = patientsController.index;
exports.v1_patientsShow = patientsController.show;
exports.v1_patientsDestroy = patientsController.destroy;
exports.v1_patientsUpdate = patientsController.update;

// Appointment
exports.v1_appointmentsCreate = appointmentsController.create;
exports.v1_appointmentsList = appointmentsController.index;
exports.v1_appointmentsShow = appointmentsController.show;
exports.v1_appointmentsDestroy = appointmentsController.destroy;
exports.v1_appointmentsUpdate = appointmentsController.update;

// Billing
exports.v1_billingCreate = billingController.create;
exports.v1_billingList = billingController.index;
exports.v1_billingShow = billingController.show;
exports.v1_billingDestroy = billingController.destroy;
exports.v1_billingUpdate = billingController.update;

module.exports = exports;
    