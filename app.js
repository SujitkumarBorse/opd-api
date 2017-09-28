
"use strict";
const SwaggerExpress = require("swagger-express-mw");
const app = require("express")();
const cuti = require("cuti");
const log4js = cuti.logger.getLogger;
const logger = log4js.getLogger("opd-api");
const bluebird = require("bluebird");
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/opd";

global.Promise = bluebird;
global.logger = logger;

mongoose.connect(mongoUrl, err =>{
    if(err){
        logger.error(err);
    }
    else{
        logger.info("Connected to DB");
    }
});

var counter = 0;
var logMiddleware = (req, res, next) => {
    var reqId = counter++;
    if (reqId == Number.MAX_VALUE) {
        reqId = counter = 0;
    }

    logger.info(reqId + " " + req.ip + " " +  req.method + " " + req.originalUrl);
    next();
    logger.trace(reqId + " Sending Response");
};
app.use(logMiddleware);

var config = {
    appRoot: __dirname
};
module.exports = app; 



SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }

    swaggerExpress.register(app);

    var port = process.env.PORT || 9000;
    app.listen(port, (err) => {
        if(!err){
            
            logger.info("Server started on port "+port);
        }
        else
            logger.error(err);
    });

});
    