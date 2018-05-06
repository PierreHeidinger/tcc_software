const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profiles = require('../models/profiles')
const groups = require('../models/groups')

const questionSchema = new Schema({

    content :{
        type :String,
        required : true
    },
    group : {
        type : groups.schema,
        required : true
    },
    profile : {
        type : profiles.schema,
        required : true,       
    }

},
{
    versionKey: false 
});

module.exports = mongoose.model('questions',questionSchema);