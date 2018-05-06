const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

     user :String,
     password : String,

});

module.exports = mongoose.model('users',UserSchema);