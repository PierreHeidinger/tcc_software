
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const StudentsSchema = new Schema({

    RA: String,
    name: String
});

module.exports = mongoose.model('students',StudentsSchema);