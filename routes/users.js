'use strict'

var express = require('express');
var userController = require('../controllers/users');
var users = express.Router();

users.post('/api/user', userController.createUser);
users.post('/api/login', userController.loginUser);

module.exports = users;
