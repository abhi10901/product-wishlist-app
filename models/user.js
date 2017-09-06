"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('User', UserSchema);