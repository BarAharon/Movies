var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    userName: String,
    password: String     
});

module.exports = mongoose.model('users', usersSchema)