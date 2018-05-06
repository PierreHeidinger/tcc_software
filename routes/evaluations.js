const express = require('express');
const router = require('express-promise-router')();
const { Test } = require('../controllers/evaluations')

module.exports = function(app){

    router.post('/evaluations', Test);

    app.use('/api',router);
}