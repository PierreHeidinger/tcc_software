const { typeSchedule } = require('../const/types')
const {Evaluation,Teacher,Student,Profile} = require('../models/index');


/**
 * Public class controller
 */
class EvaluationController {

    async  CreateEvaluationsStudents(req,res) {

        const RA = req.body.RA;
    
    
        //find class student
        const scheduleStudent = await  Schedule.findOne({ "owner.RA" : RA });
        //find courses ,teachers, campus
        const courses = await Schedule.find({ "class" : scheduleStudent.class , "type" : typeSchedule.Teacher });
    
    
        for(let course of courses){
    
            
    
        }
    
        res.status(200).json(courses);
    }
    
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
};

module.exports = {
    EvaluationController
}
