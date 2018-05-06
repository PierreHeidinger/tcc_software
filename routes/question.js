const express = require('express');
const router = require('express-promise-router')();
const { List , Create , Update , Remove , LoadQuetions , Read } = require('../controllers/question')

module.exports = function(app){

    router.get('/question', List);

    router.post('/question',Create);

    router.put('/question/:_id',Update);

    router.delete('/question/:_id',Remove);

    router.post('/question/load',LoadQuetions)

    //union to express
    app.use('/api',router);
}



