const Question = require('./questions');
const Profile  = require('../models/profiles')
const Group = require('../models/groups')
const Teacher = require('../models/teachers');
const Student = require('../models/students');
const Schedule = require('../models/index');
const Evaluation = require('../models/evaluations');

module.exports = {
    Question,
    Profile,
    Group,
    Teacher,
    Student,
    Schedule,
    Evaluation
}