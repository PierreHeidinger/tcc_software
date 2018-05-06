const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({

    type : String,
    campus : String,
    discipline : String,
    course : String,
    class : String,
    startDate : Date,
    EndDate : Date,
    owner : {
        type :Object,
        required : true
    }

});

module.exports = mongoose.model('schedules',scheduleSchema);