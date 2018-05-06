const User = require('../models/users')
const { typeSchedule } = require('../const/types')

module.exports = {
    Login : login
}

/**
 * Public functions
 */

async function login(req,res) {

    const user = req.params.user;
    const password = req.params.password;

    const uuser = await User.findOne({ 'user' : user , 'password' : password });
   
    if(!uuser) return res.status(411).json("don't exists user");

    return res.status(200).json(true);
}

/**
 * Private functions
 */
