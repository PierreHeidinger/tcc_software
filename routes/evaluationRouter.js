const router = require('express-promise-router')();
const { EvaluationController } = require('../controllers/evaluationController')

module.exports = function (app) {

    var evaluationController = new EvaluationController();

    router.post('/evaluation', evaluationController.create);
    // router.put('/evaluation/:_ra',evaluationController.Update);
    // router.get('/evaluation',evaluationController.List);
    // router.get('/evaluation/:_ra',evaluationController.GetEvaluationsByevaluator);


    app.use('/api', router);
}