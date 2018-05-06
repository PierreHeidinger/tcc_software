const express = require('express');
const router = require('express-promise-router')();
const {  AuthenticationController } = require('../controllers/authentication');

module.exports = function(app){

    var authenticationController = new AuthenticationController();

    router.get('/login/:user;:password', authenticationController.Login);

    //union to express
    app.use('/api',router);
}



