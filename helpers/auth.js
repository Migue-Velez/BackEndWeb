'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var {response} = require('express');
var secret = 'estaEsLaContrasenitaMasSeguraQueExisteEnTodoElMundoMundial';

function generateToken(user){
    var payload = {
        sub : user._id,
        username : user.username,
        role : user.role,
        iat : moment().unix,
        exp : moment().add('2', 'minutes').unix()
    }

    return jwt.encode(payload, secret);
}

function validateToken(req, resp, nextStep) {
    try{
        var userToken = req.headers.authorization;
        var cleanToken = userToken.replace('Bearer ', '');
        var payload = jwt.decode(cleanToken, secret);

        req.headers.userId = payload.sub;
        req.headers.role = payload.role;
        nextStep();
    }
    catch(ex){
        resp.status(403).send({'message': 'Invalid token'});
    }
}

module.exports = {generateToken, validateToken}
