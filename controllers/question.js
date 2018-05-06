
const { ReadExcel } = require('../services/excel')

const Question = require('../models/questions');
const Profile  = require('../models/profiles')
const Group = require('../models/groups')



module.exports = {
        List : list,
        Create : create,
        Update : update,
        Remove : remove,
        LoadQuetions : loadMassive
}

/**
 * Public functions
 */

async function list(req,res){
    const questions = await Question.find({}).exec();
    return res.status(200).json(questions);
};

async function create(req,res){
    const content = req.body;
    const question = new Question(content);

    const newQuestion = await question.save();

    return res.status(200).json(newQuestion);
};

async function update(req,res){

    const id = req.params._id;
    const content = req.body;

    const question = await Question.findOneAndUpdate(id,content).exec();

    return res.status(200).json(question);
};

async function remove(req,res){

    const id = req.params._id;

    const result = await Question.findByIdAndRemove(id);

    return res.status(200).json(result);
}

async function loadMassive(req,res){

    const dir = req.body.dir;
    const information = await ReadExcel(dir);

    const lista = await readInformation(information);

    const profiles = await createOrUpdateProfiles(lista.profiles);

    const groups = await createOrUpdateGroups(lista.groups);

    const question = await createOrUpdateQuestions(lista.questions);

    res.status(200).json({message : "sending information to mongodb , wait please"});
    
}

/**
 * Private functions 
 */
async function readInformation(docInformation){
    
    var questions = [];
    var profiles = [];
    var groups = [];

    docInformation.forEach((sheet)=>{

        sheet.content.forEach((model)=>{
            let profile ={
                "description" : model.Perfil
            };
    
            let group = {
                "description" : model.Grupo,
                "profile" : model.Perfil
            }
    
            let question = {
                "content" : model.Questão,
                "group" : model.Grupo,
                "profile" : model.Perfil
            }
    
            profiles.push(profile);
            groups.push(group);
            questions.push(question);
        })

    })

    return {"questions" : questions , "profiles" : profiles , "groups" : groups };
}
async function createOrUpdateProfiles(profiles){

    for(var profile of profiles){

        const filter = { description : profile.description.trim() };
        const options = { upsert : true }

        const createUpdate =  await Profile.update(filter,profile,options);
    }   

}
async function createOrUpdateGroups(groups){

    for(var group of groups){

        group.profile = await Profile.findOne({ description : group.profile }) ;
        
        const createUpdate = await Group.update({ description : group.description.trim() , "profile.description": group.profile.description.trim() },group ,{ upsert : true });

    }

}
async function createOrUpdateQuestions(questions){

    for(var question of questions){

        const group = question.group;
        const profile = question.profile;

        question.group = await Group.findOne({ "description" : group, "profile.description" : profile });
        question.profile = await Profile.findOne({ "description" : profile })

        const createUpdate = await Question.update({ "content" : question.content } , question , { upsert : true });
    }
}

