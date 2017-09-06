"use strict";

const express = require("express"),
    router = new express.Router(),
    userHandlers = require("../handlers/userHandler"),
    productHandlers = require("../handlers/productHandler");

router.get("/users", userHandlers.findAllUsers);
router.get("/users/:id", userHandlers.findUserById);
router.post("/users", userHandlers.createUser);

router.get("/users/:id/wishlist", userHandlers.findUserWishlist);
router.post("/users/:id/wishlist", userHandlers.addProductToWishlist);

router.get("/products", productHandlers.findAllProducts);
router.get("/products/:id", productHandlers.findProductById);
router.post("/products", productHandlers.createProduct);

module.exports = router;