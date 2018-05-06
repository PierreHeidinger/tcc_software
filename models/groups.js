const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Profile = require('../models/profiles');

const groupSchema = new Schema({

    description : {
        type :String,
        required : true
    },
    profile : {
        type : Profile.schema,
        required : true
    }
    
},
{
    versionKey: false 
});

module.exports = mongoose.model('groups',groupSchema);