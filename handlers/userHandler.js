"use strict";

const User = require("mongoose").model("User"),
    Product = require('mongoose').model('Product'),
    Promise = require('bluebird'),
    _ = require("lodash");


/**
 * Find all users into the system
 */
module.exports.findAllUsers = (req, res, next) => {

    var promise = User.find()
        .select({
            name: 1,
            _id: 1
        }).exec();

    promise.then((users) => {
            res.status(200).json({
                users: users
            });
        })
        .catch((err) => {
            res.status(500).json({
                errors: err
            });
        });
};

/**
 * Find user by ID
 */
module.exports.findUserById = (req, res) => {

    var userId = req.params.id;
    var promise = User.find({ _id: userId })
        .limit(1)
        .select({ name: 1, _id: 1 })
        .exec();

    return promise.then((users) => {
            if (users && users.length > 0)
                return users[0];
            else
                res.status(401).json({
                    message: 'Bad Request. Provided User id is not a valid user id.'
                });
        })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json({
                errors: err
            });
        });
};

/**
 * Create new User
 */
module.exports.createUser = (req, res) => {
    var newUser = new User(req.body.user);

    return newUser.save()
        .then((savedUser) => {
            res.status(201).json({
                user: savedUser
            });
        })
        .catch((err) => res.status(500).json({ errors: err }));
};

/**
 * Find User Wishlist
 */
module.exports.findUserWishlist = (req, res) => {
    var userId = req.params.id;
    var promise = User.find({ _id: userId })
        .limit(1)
        .populate({
            path: 'wishlist'
        })
        .exec();

    return promise.then((users) => {

            if (users && users.length > 0)
                return users[0];
            else
                res.status(400).json({
                    message: 'Bad Request. Provided User id is not a valid user id.'
                });
        })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json({
                errors: err
            });
        });
};

module.exports.addProductToWishlist = (req, res, next) => {
    var userId = req.params.id;
    var productId = req.body.productId;

    var userPromise = User.find({ _id: userId })
        .limit(1)
        .exec();

    var productPromise = Product.find({ _id: productId }).limit(1).exec();

    Promise.all([userPromise, productPromise])
        .then(([users, products]) => {

            if (!users || users.length === 0 || !products || products.length === 0)
                return Promise.reject({
                    statusCode: 400,
                    message: 'Bad Request. Provided User id or product does not exist.'
                });
            else {
                return [users[0], products[0]];
            }
        })
        .then(([user, product]) => {

            if (!_.includes(_.map(user.wishlist, toHexString), toHexString(product._id))) {
                user.wishlist.push(product);
                user.save();
            } else
                return Promise.reject({
                    statusCode: 200,
                    message: 'Product already in wishlist.'
                });
        })
        .then((updatedUser) => {
            res.status(200)
                .json({
                    message: 'Product added successfully into your wishlist',
                    user: updatedUser
                });
        })
        .catch((err) => {
            next(err);
        });
};

var toHexString = function(oid) {
    return oid.toHexString();
};