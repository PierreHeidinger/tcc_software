const express = require('express');
const router = require('express-promise-router')();
const { EvaluationController } = require('../controllers/evaluations')

module.exports = function(app){

    var evaluationController = new EvaluationController();

    router.post('/evaluations', evaluationController.CreateEvaluationsStudents);

    app.use('/api',router);
}