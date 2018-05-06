const express = require('express');
const router = require('express-promise-router')();
const {  Login } = require('../controllers/authentication');

module.exports = function(app){


    router.get('/login/:user;:password',Login);

    //union to express
    app.use('/api',router);
}



