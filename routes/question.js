const express = require('express');
const router = require('express-promise-router')();
const { QuestionController } = require('../controllers/question')

module.exports = function(app){

    var questionController = new QuestionController();
  
    router.get('/question', questionController.List);

    router.post('/question',questionController.Create);

    router.put('/question/:_id',questionController.Update);

    router.delete('/question/:_id',questionController.Remove);

    router.post('/question/load',questionController.LoadMassive)

    //union to express
    app.use('/api',router);
}



