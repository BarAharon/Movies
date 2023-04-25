var mongoose = require('mongoose');

var moviesSchema = new mongoose.Schema({
    name: String,
    genres: [],    
    image: String,
    premiered: Date    
});

module.exports = mongoose.model('movies', moviesSchema)