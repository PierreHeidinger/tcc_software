//models
const {Schedule,Teacher,Student} = require('../models/index');

const Excel = require('../services/excel');
const {  typeSchedule } = require('../const/types')



/**
 * Public functions 
**/
class ScheduleController {

    async LoadMassiveTeachers(req,res){

        const dir = req.body.dir;
        const excelTeachers = await Excel.Read(dir);
    
        const teachersAndSchedules = await cleanInformationTeachers(excelTeachers);
        const createOrUpdateTeachers = await saveOrUpdateTeachers(teachersAndSchedules.teachers);
        const insertHoarios = await saveSchedulesTeachers(teachersAndSchedules.schedules);
    
        res.status(200).json(excelTeachers);
    }
    
    async LoadMassiveStudents(req,res){
    
        const dir = req.body.dir;
        const excelStudents = await Excel.Read(dir);
    
        const studentsAndSchedules = await clearInformationStudents(excelStudents);
    
        const createOrUpdate = await saveOrUpdateStudents(studentsAndSchedules.students);
    
        const createSchedules = await saveSchedulesStudents(studentsAndSchedules.schedules);
    
        res.status(200).json(studentsAndSchedules)
    }
    
}

/**
 * Private functions 
**/
async function cleanInformationTeachers(excel){

    var teachers = [];
    var schedules = [];

    for(let page of excel){  

        for(let line of page.content){

            let teacher = {
                RA : line.ID,
                name : line.NOME,
                email : line.Emailpessoal,
                emailComercial : line.Emailcomercial
            }
            
            teachers.push(teacher);

            let schedule = {
                type : typeSchedule.Teacher,
                campus : line.CAMPUS,
                discipline : line.DISCIPLINA,
                course : line.Curso,
                class : line.BLOCO,
                startDate : line.INICIO,
                endDate: line.FIM,
                owner : teacher
            }
            schedules.push(schedule);
        }

    };

    return {"teachers" : teachers , "schedules" :schedules } ;
}

async function saveOrUpdateTeachers(teachers){


    for(let teacher of teachers){

        const createOrUpdate = await Teacher.update({ "RA" : teacher.RA },teacher,{upsert:true})

    }

}

async function saveSchedulesTeachers(schedules){

    const inserted = await Schedule.insertMany(schedules);

}

async function clearInformationStudents(excel){

    var students = [];
    var schedules = [];

    for(var page of excel){

        const unidade = page.name;

        for (let document of page.content){

            let student = {
                "RA": document.Matrícula,
                "name" : document.Nome
            }

            students.push(student);
            
            let schedule = {
                type : typeSchedule.Student,
                campus : unidade,
                course : document.Unidade,
                class : document.Turma,
                owner : student
            }
            schedules.push(schedule);

        }


    }

    return {students : students , schedules : schedules};
}

async function saveOrUpdateStudents(students){

    for(let student of students){

        const createOrUpdate = await  Student.update({ "RA" : student.RA },student,{upsert:true})

    }
}

async function saveSchedulesStudents(schedules){

    const inserted = await Schedule.insertMany(schedules);

}

module.exports ={
    ScheduleController
}