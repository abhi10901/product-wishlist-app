"use strict";

require("dotenv").config();
const Server = require("./server");

Server.start(process.env.PORT || 4000, function(err) {

    if (err) console.log("Server failed to start.");
});