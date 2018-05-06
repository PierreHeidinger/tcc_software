const express = require('express');
const router = require('express-promise-router')();
const {  ScheduleController  } = require('../controllers/schedule')

module.exports = function(app){

    var scheduleController = new ScheduleController();

    router.post('/schedule/teachers',scheduleController.LoadMassiveTeachers);

    router.post('/schedule/students',scheduleController.LoadMassiveStudents);

    //union to express
    app.use('/api',router);
}



