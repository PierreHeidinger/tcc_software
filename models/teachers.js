
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TeacherSchema = new Schema({

    RA: String,
    name: String,
    email : String,
    emailComercial : String,

});

module.exports = mongoose.model('teachers',TeacherSchema);