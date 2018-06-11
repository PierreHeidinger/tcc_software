const { typeSchedule } = require('../const/types')
const { Questionnaire, Teacher, Student, Profile, Question, Schedule } = require('../models/index');


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

    async getQuestionnaireById(req, res) {
        let questionnaire = await Questionnaire.findOne({ "_id": req.params._id });
        res.status(200).json(questionnaire);
    }

    async getQuestionnaireByEvaluator(req, res) {
        console.log(req.params._id);
        let evaluator = await Student.findOne({ "RA": req.params._id });
        if (!evaluator) throw new Error("Usuario invalido");

        let schedule = await Schedule.findOne({ "owner.RA": evaluator.RA });
        let scheduleByClass = await Schedule.find({ "class": schedule.class, "type": typeSchedule.Teacher });
        if (!scheduleByClass) throw new Error("No se encontraron aulas");

        let teachers = new Array();
        let infraestruturas = new Array();

        for (let sbc of scheduleByClass) {
            if (!teachers.includes(sbc.owner.name)) {
                teachers.push(sbc.owner.name);
            }
            if (!infraestruturas.includes(sbc.campus)) {
                infraestruturas.push(sbc.campus)
            }
        }

        console.log(teachers);
        console.log(infraestruturas);

        let questionnaires = await Questionnaire.find();
        let questionnaireDto;
        let questionnairesDto = new Array();
        for (let questionnaire of questionnaires) {
            questionnaireDto = new Object();
            if (questionnaire.questionnaireType == "Aluno avalia a docente") {
                for (let teacher of teachers) {
                    questionnaireDto = new Object();
                    console.log(teacher);
                    questionnaireDto.questionnaire = questionnaire;
                    questionnaireDto.evaluator = teacher;
                    questionnairesDto.unshift(questionnaireDto);
                }
            } else if (questionnaire.questionnaireType == "Aluno avalia a Infraestrutura") {
                for (let infraestrutura of infraestruturas) {
                    questionnaireDto = new Object();
                    console.log(infraestrutura);
                    questionnaireDto.questionnaire = questionnaire;
                    questionnaireDto.evaluator = infraestrutura;
                    questionnairesDto.unshift(questionnaireDto);
                }
            } else {
                questionnaireDto.questionnaire = questionnaire;
                questionnairesDto.push(questionnaireDto);
            }

        }
        return res.status(200).json(questionnairesDto);
    }

}

async function getTeachers(params) {

}

module.exports = {
    QuestionnaireController
}