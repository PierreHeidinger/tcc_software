const express = require('express');
const router = require('express-promise-router')();
const {  LoadScheduleTeachers ,LoadScheduleStudents } = require('../controllers/schedule')

module.exports = function(app){


    router.post('/schedule/teachers',LoadScheduleTeachers);
    router.post('/schedule/students',LoadScheduleStudents)

    //union to express
    app.use('/api',router);
}



