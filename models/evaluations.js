const mongoose = require('mongoose');
const Question = require('../models/questions');
const Profile = require('../models/profiles');

const Schema = mongoose.Schema;

const evaluationsSchema = new Schema({

    profile : {
        type : Profile.schema,
        required : true,       
    },
    questions : {
        type : [Question.schema],
        required : true
    },
    owner : Object,
    evaluated : Object

});

module.exports = mongoose.model('evaluations',evaluationsSchema);