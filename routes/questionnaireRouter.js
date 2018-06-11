const express = require('express');
const router = require('express-promise-router')();
const { QuestionnaireController } = require('../controllers/questionnaireController')

module.exports = function (app) {

    var questionnaireController = new QuestionnaireController();
    router.post('/questionnaire/massive', questionnaireController.massiveCreation);
    router.post('/questionnaire', questionnaireController.create);
    router.put('/questionnaire', questionnaireController.update);
    router.get('/questionnaire', questionnaireController.list);
    router.get('/questionnaire/:_id', questionnaireController.getQuestionnaireById);
    router.get('/questionnaire/evaluator/:_id',questionnaireController.getQuestionnaireByEvaluator);
    app.use('/api', router);
}