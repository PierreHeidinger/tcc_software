const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionnaireSchema = new Schema({

    creationDate: { 
        type: Date,
        default: Date.now
    },
    updateDate: { 
        type: Date,
        default: Date.now
    },
    questionnaireType: String,
    questions: [{
        text:String,
        asnwerType:{
            type:String,
            default: "multiple choise"
        },
        options: {
            type:Array,
            default : ["very unsatisfied","unsatisfied","indiffent/neutral","satisfied","very satisfied"]
        }
    }]
    
});

module.exports = mongoose.model('questionnaires',questionnaireSchema);