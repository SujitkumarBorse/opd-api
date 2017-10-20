"use strict";

const mongoose = require("mongoose");
const definition = require("../helpers/billing.definition.js").definition;
const SMCrud = require("swagger-mongoose-crud");
const cuti = require("cuti");
const schema = new mongoose.Schema(definition);
const logger = global.logger;

var options = {
    logger:logger,
    collectionName:"bill"
};
schema.pre("save", cuti.counter.getIdGenerator("BILL", "billing"));
var crudder = new SMCrud(schema,"bill", options);
module.exports = {
    create:crudder.create,
    index:crudder.index,
    show:crudder.show,
    destroy:crudder.markAsDeleted,
    update:crudder.update
};
    