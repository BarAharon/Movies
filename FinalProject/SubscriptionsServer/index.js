var express = require('express');

var moviesController = require('./controllers/MoviesController');
var membersController = require('./controllers/MembersController');
var subscriptionsController = require('./controllers/SubscriptionsController');

var utilsMembers = require('./utils/UtilsMembers');
var utilsMovies = require('./utils/UtilsMovies');

var membersBL = require('./models/MembersBL');
var moviesBL = require('./models/MoviesBL');

var app = express();

var cors = require('cors');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use(cors());
require('./configs/DataBase');
app.use('/movies', moviesController);
app.use('/members', membersController);
app.use('/subscriptions', subscriptionsController);

app.listen(8000, async () => {
    console.log('The server is listening');

    var members = await utilsMembers.getAllMembers();  
    members.data.forEach(member => {
        membersBL.createAPIMember(member);
    });

    var movies = await utilsMovies.getAllMovies();

    movies.data = movies.data.slice(0, 10);
    movies.data.forEach(movie => {
        moviesBL.createAPIMovie(movie);
    });
});