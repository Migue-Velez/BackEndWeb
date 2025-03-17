'use strict'

var Product = require('../models/products');

function createProduct(req, resp){
    var productReqBody = req.body;
    var productReqHeader = req.headers;
    var newProduct = new Product;

    newProduct.title = productReqBody.title;
    newProduct.description = productReqBody.description;
    newProduct.price = productReqBody.descripcion;

    if( newProduct.title === null || newProduct.title.trim() === ''
        || newProduct.description === null || newProduct.description.trim() === ''
        || newProduct.price === null || newProduct.price <= 0 ){
        resp.status(400).send({'message':'One or more required variables were not sent' });
    }

    if (productReqHeader.role === 'admin'){
        newProduct.save().then(
            (savedProduct) => {
                resp.status(200).send({'message': 'Product was created successfully.', 'product': savedProduct});
            },
            (err) => {
                resp.status(500).send({'message': 'An error ocurred while creating the product.', 'error': err});
            }
    
        );
    }
    else {
        resp.status(500).send({'message': 'You don\'t have permissions to do this.'});
    }
}

function findProduct(req, resp) {    
    var productToFind = req.params.title;

    Product.find({title: {$regex: productToFind}}).then(
        (foundProduct) => {
            resp.status(200).send({'product': foundProduct});
        },
        (err) => {
            resp.status(500).send({'message':'An error ocurred while searching the product', 'error': err });
        }
    );
}

module.exports = {createProduct, findProduct};
