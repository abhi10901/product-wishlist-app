"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors");

const Server = function() {
    // connect to the database and load models
    require("./models").connect(process.env.MONGODB_URL);

    this.app = express();
    this.app.use(bodyParser.urlencoded({
        extended: true
    }));
    this.app.use(bodyParser.json());

    this.app.use(cors());

    // routes
    this.app.use("/api", require("./routes/apiRoutes"));

    this.app.get("/", function(req, res) {
        res.end("Hello World");
    });


    this.app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({ 'error': err });
    });

};

Server.prototype.start = function(port, cb) {
    this.app.listen(port, (err) => {
        if (err) {
            console.log("Server failed to start...");
            process.exit(0);
        }
        console.log("Server is running on http://localhost:" + port + " or http://127.0.0.1:" + port);
        cb();
    });
};

module.exports = new Server();