
const Excel = require('../services/excel')
const Files = require('../services/files');
const { Question, Profile, Group, Questionnaire } = require('../models/index');


/**
 * Public class Controller
 */

class QuestionController {

    async List(req, res) {
        const questions = await Question.find({}).exec();
        return res.status(200).json(questions);
    };

    async Create(req, res) {
        const content = req.body;
        const question = new Question(content);

        const newQuestion = await question.save();

        return res.status(200).json(newQuestion);
    };

    async Update(req, res) {

        const id = req.params._id;
        const content = req.body;

        const question = await Question.findOneAndUpdate(id, content).exec();

        return res.status(200).json(question);
    };

    async Remove(req, res) {

        const id = req.params._id;

        const result = await Question.findByIdAndRemove(id);

        return res.status(200).json(result);
    }

    async LoadMassive(req, res) {

        const dir = await Files.Save(req.files.questions);

        const information = await Excel.Read(dir);

        const lista = await readInformation(information);

        var questionnaires = [];
        let az = await Questionnaire.update({ state: true, origin: "EXCEL" }, { $set: { state: false } }, { multi: true });

        for (let profile of lista.profiles) {

            let questionnaire = {
                questionnaireType: profile.description
            };


            var questions = [];

            for (let question of lista.questions.filter(_question => _question.profile == profile.description)) {

                let localQuestion = {
                    text: question.content
                }
                questions.push(localQuestion);
            }

            questionnaire.questions = questions;
            questionnaire.state = true;
            questionnaire.origin = "EXCEL"
            let curretDate = new Date();
            questionnaire.startDate = curretDate;
            questionnaire.endDate = new Date().setMonth(curretDate.getMonth() + 6);
            questionnaires.push(questionnaire);
        }

        await Questionnaire.insertMany(questionnaires);
        res.status(200).json("sending information of questions , waiting please");

    }

}

/**
 * Private functions 
 */
async function readInformation(docInformation) {

    var questions = [];
    var profiles = [];
    var groups = [];

    docInformation.forEach((sheet) => {

        sheet.content.forEach((model) => {
            let profile = {
                "description": model.Perfil
            };

            let group = {
                "description": model.Grupo,
                "profile": model.Perfil
            }

            let question = {
                "content": model.Questão,
                "group": model.Grupo,
                "profile": model.Perfil
            }

            var exists = profiles.find(x => x.description == model.Perfil);
            if (!exists) profiles.push(profile);
            groups.push(group);
            questions.push(question);
        })

    })

    return { "questions": questions, "profiles": profiles, "groups": groups };
}
async function createOrUpdateProfiles(profiles) {

    for (var profile of profiles) {

        const filter = { description: profile.description.trim() };
        const options = { upsert: true }

        const createUpdate = await Profile.update(filter, profile, options);
    }

}
async function createOrUpdateGroups(groups) {

    for (var group of groups) {

        group.profile = await Profile.findOne({ description: group.profile });

        const createUpdate = await Group.update({ description: group.description.trim(), "profile.description": group.profile.description.trim() }, group, { upsert: true });

    }

}
async function createOrUpdateQuestions(questions) {

    for (var question of questions) {

        const group = question.group;
        const profile = question.profile;

        question.group = await Group.findOne({ "description": group, "profile.description": profile });
        question.profile = await Profile.findOne({ "description": profile })

        const createUpdate = await Question.update({ "content": question.content }, question, { upsert: true });
    }
}
async function load(lista) {

    const profiles = await createOrUpdateProfiles(lista.profiles);

    const groups = await createOrUpdateGroups(lista.groups);

    const question = await createOrUpdateQuestions(lista.questions);
}


//Exports class
module.exports = {
    QuestionController
}