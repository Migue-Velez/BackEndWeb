'user strict'

var express = require('express');
var productController = require('../controllers/products');
var products = express.Router();
var token = require('../helpers/auth');

products.post('/api/product', token.validateToken, productController.createProduct); //Login
products.get('/api/product/:title', productController.findProduct);

module.exports = products;
