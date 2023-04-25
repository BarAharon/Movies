var mongoose = require('mongoose');

var membersSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String    
});

module.exports = mongoose.model('members', membersSchema)