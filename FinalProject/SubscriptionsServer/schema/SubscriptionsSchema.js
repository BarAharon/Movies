var mongoose = require('mongoose');

var subscriptionsSchema = new mongoose.Schema({
    memberId : mongoose.ObjectId,
    movies: 
    [
        {
            movieId: mongoose.ObjectId,
            date: Date
        }
    ]
});

module.exports = mongoose.model('subscriptions', subscriptionsSchema)