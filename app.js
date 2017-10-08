
"use strict";
const SwaggerExpress = require("swagger-express-mw");
const app = require("express")();
const cuti = require("cuti");
const log4js = cuti.logger.getLogger;
const logger = log4js.getLogger("opd-api");
const bluebird = require("bluebird");
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/opd";
var jwt = require('jsonwebtoken');
var _ = require('underscore');

global.Promise = bluebird;
global.logger = logger;

mongoose.connect(mongoUrl, err => {
    if (err) {
        logger.error(err);
    }
    else {
        logger.info("Connected to DB");
    }
});

var counter = 0;
var logMiddleware = (req, res, next) => {
    var reqId = counter++;
    if (reqId == Number.MAX_VALUE) {
        reqId = counter = 0;
    }

    logger.info(reqId + " " + req.ip + " " + req.method + " " + req.originalUrl);
    next();
    logger.trace(reqId + " Sending Response");
};
app.use(logMiddleware);

var config = {
    appRoot: __dirname
};


var openRoutes = [{
    url: "/opd-api/v1/users/login",
    method: "POST"
}, {
    url: "/opd-api/v1/users",
    method: "POST"
}]



// route middleware to verify a token
app.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'] || req.headers['token'];

    // If request is for unauthorize route
    if (_.where(openRoutes, { url: req.url, method: req.method }).length > 0) {

        next();

    } else if (token) {
        // decode token
        // verifies secret and checks exp
        jwt.verify(token, 'superSecret', function (err, decoded) {
            if (err) {
                return res.json({ status: 'fail', message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.session = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            status: 'fail',
            message: 'Token not  provided.'
        });

    }
});

module.exports = app;



SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) { throw err; }

    swaggerExpress.register(app);

    var port = process.env.PORT || 9000;
    app.listen(port, (err) => {
        if (!err) {

            logger.info("Server started on port " + port);
        }
        else
            logger.error(err);
    });

});


// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
// https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
// https://www.codementor.io/emjay/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3