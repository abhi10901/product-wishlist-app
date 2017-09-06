"use strict";

const Product = require('mongoose').model('Product'),
    Promise = require('bluebird');


/**
 * Find all products into the system
 */
module.exports.findAllProducts = (req, res) => {

    var promise = Product.find()
        .exec();

    promise.then((products) => {
            res.status(200).json({
                products: products
            });
        })
        .catch((err) => {
            res.status(500).json({
                errors: err
            });
        });
};

/**
 * Find product by ID
 */
module.exports.findProductById = (req, res) => {

    var productId = req.params.id;
    var promise = Product.find({ _id: productId })
        .limit(1)
        .exec();

    return promise.then((products) => {
            if (products && products.length > 0)
                return products[0];
            else
                res.status(401).json({
                    message: 'Bad Request. Provided product id is not valid.'
                });
        })
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => {
            res.status(500).json({
                errors: err
            });
        });
};

/**
 * Create new Product
 */
module.exports.createProduct = (req, res) => {
    var newProduct = new Product(req.body.product);

    return newProduct.save()
        .then((savedProduct) => {
            res.status(201).json({
                product: savedProduct
            });
        })
        .catch((err) => res.status(500).json({ errors: err }));
};