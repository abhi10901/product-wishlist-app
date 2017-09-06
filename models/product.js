"use strict";

const mongoose = require("mongoose");

const SIZE = ["Large", "Medium", "Small"];
const STATUS_TYPES = ['In Stock', "Sold"];

const ProductSchema = new mongoose.Schema({
    productId: { type: String },
    name: { type: String },
    image_url: { type: String },
    size: {
        type: String,
        enum: SIZE
    },
    price: { type: Number },
    quantity: { type: Number },
    stock_status: {
        type: String,
        enum: STATUS_TYPES
    }
});

module.exports = mongoose.model('Product', ProductSchema);