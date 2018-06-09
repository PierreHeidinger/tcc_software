const mongoose = require('mongoose');
const Question = require('../models/questions');
const Profile = require('../models/profiles');
const Schema = mongoose.Schema;

const evaluationSchema = new Schema({

    evaluator: String,
    evaluated: String,
    questionnaireType: String,
    state: String,
    creationDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    questions: [{
        id: String,
        text: String,
        answer: String
    }]
});

module.exports = mongoose.model('evaluation', evaluationSchema);