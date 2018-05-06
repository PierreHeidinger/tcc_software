const { typeSchedule } = require('../const/types')
const Profile = require('../models/profiles')
const Schedule = require('../models/schedule');
const Teacher = require('../models/teachers');
const Evaluation = require('../models/evaluations');



module.exports = {
    Test : CreateEvaluationsStudents
}

/**
 * Public functions
 */

async function CreateEvaluationsStudents(req,res) {

    const RA = req.body.RA;


    //find class student
    const scheduleStudent = await  Schedule.findOne({ "owner.RA" : RA });
    //find courses ,teachers, campus
    const courses = await Schedule.find({ "class" : scheduleStudent.class , "type" : typeSchedule.Teacher });


    for(let course of courses){

        

    }

    res.status(200).json(courses);
}

/**
 * Private functions
 */

 async function createEvaluation(profile,questions,owner,evaluated){

    const evaluation = {
        profile : profile,
        questions : questions,
        owner : owner ,
        evaluated : evaluated
    };

    return evaluation;
  }
