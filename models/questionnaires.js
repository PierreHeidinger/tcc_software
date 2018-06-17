const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionnaireSchema = new Schema({

    questionnaireType: String,
    state: Boolean,
    origin: String,
    questions: [{
        text: String,
        questionType: {
            type: String,
            default: "radio"
        },
        options: {
            type: Array,
            default: ["very unsatisfied", "unsatisfied", "indiffent/neutral", "satisfied", "very satisfied"]
        }
    }],
    creationDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }

});

module.exports = mongoose.model('questionnaires', questionnaireSchema);