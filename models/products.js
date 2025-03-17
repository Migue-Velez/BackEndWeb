'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = Schema({
    title: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('products', ProductSchema);
