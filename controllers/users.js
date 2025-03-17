'use strict'

var User = require('../models/users');
var token = require('../helpers/auth');
var bcrypt = require('bcryptjs');

function createUser(req, resp){

    var userReqBody = req.body;
    var salt = bcrypt.genSaltSync(15);

    var newUser = new User();
    newUser.username = userReqBody.username;
    newUser.password = bcrypt.hashSync(userReqBody.password, salt);
    newUser.role = userReqBody.role;

    if(newUser.username === null || newUser.username.trim() === ''
    || newUser.password === null || newUser.password.trim() === ''
    || newUser.role === null || newUser.role.trim() === ''
    ){
        resp.status(500).send({'message': 'One or more required fields were not filled.'})
    }

    newUser.save().then(
        (savedUser) => {
            resp.status(200).send({'message': 'User was created succesfully', 'user': savedUser})
        },
        (err) => {
            resp.status(500).send({'message': 'An error ocurred while creating the user', 'error': err})
        }
    );
}

function loginUser(req, resp){
    var userReqBody = req.body;

    User.findOne({'username': userReqBody.username}).then(
        (userFound) => {
            if (userFound == null){
                resp.status(403).send({'message': 'User not found', 'user': userFound});
            }
            if(bcrypt.compareSync(userReqBody.password, userFound.password)){
                resp.status(200).send({'message': 'Login success', 'token': token.generateToken(userFound)});
            }
            else{
                resp.status(403).send({'message': 'Invalid login'});
            }
        },
        (err) => {
            resp.status(500).send({'message': 'An error ocurred while validating the user', 'error': err});
        }
    );
}

module.exports = {
    createUser, loginUser
}
