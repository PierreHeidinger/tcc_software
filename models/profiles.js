const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const profileSchema = new Schema({

    description : {
        type :String,
        required : true
    }

},
{
    versionKey: false 
});

module.exports = mongoose.model('profiles',profileSchema);