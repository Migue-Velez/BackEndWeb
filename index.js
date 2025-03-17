'use strict'

var mongoose = require('mongoose');
var application = require('./application');

mongoose.connect('mongodb://localhost:27017/DatabaseWebOne').then(
    () => {
        console.log('Database connection succesfull. Starting application');
        application.listen(6542, function(){
            console.log('Application started');
        });
    },
    err => {
        console.log('Error when connecting to database. Application not started', + err);
    }
);
