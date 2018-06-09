const { typeSchedule } = require('../const/types')
const { Questionnaire, Evaluation, Teacher, Student, Profile, Question } = require('../models/index');


/**
 * Public class controller
 */
class EvaluationController {

    async create(req, res) {
        let evaluation = await Evaluation.insertMany(req.body);
        res.status(200).json(evaluation);
    }

    async update(req, res) {
        let body = req.body;
        body.updateDate = Date.now();
        await Evaluation.findByIdAndUpdate(body.id, body);
        let evaluation = await Evaluation.findOne({ "_id": body.id });
        res.status(200).json(evaluation);
    }

    async getEvaluationsByEvaluator(req, res) {
        let questionnaire = await Evaluation.findById({ "_id": req.body.id });
        res.status(200).json(questionnaire);
    }

}

module.exports = {
    EvaluationController
}