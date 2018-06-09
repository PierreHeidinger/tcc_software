const { typeSchedule } = require('../const/types')
const { Questionnaire, Teacher, Student, Profile, Question } = require('../models/index');


class QuestionnaireController {

    async massiveCreation(req, res) {
        const questions = await Question.find();
        const profiles = await Profile.find();
        let questionnaire;
        let questionnaires = [];

        for (let profile of profiles) {

            questionnaire = new Questionnaire({
                creationDate: "creationDate",
                updateDate: "updateDate",
                questionnaireType: profile.description,
                questions: []
            });

            for (let question of questions) {
                if (profile.id == question.profile.id) {
                    questionnaire.questions.push(question);
                }
            }
            questionnaires.push(questionnaire);
        }

        await Questionnaire.insertMany(questionnaires);
        res.status(200).json(questionnaires);
    }

    async create(req, res) {
        let questionnaire = await Questionnaire.insertMany(req.body);
        res.status(200).json(questionnaire);
    }

    async update(req, res) {
        let body = req.body;
        body.updateDate = Date.now();
        await Questionnaire.findByIdAndUpdate(body.id, body);
        let questionnaire = await Questionnaire.findOne({ "_id": body.id });
        res.status(200).json(questionnaire);
    }

    async list(req, res) {
        let questionnaire = await Questionnaire.find();
        res.status(200).json(questionnaire);
    }

    async getQuestionnaireById (req, res){
        let questionnaire = await Questionnaire.findOne({ "_id": req.params._id });
        res.status(200).json(questionnaire);
    }

}


module.exports = {
    QuestionnaireController
}