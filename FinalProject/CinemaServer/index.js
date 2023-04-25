var express = require('express');

var usersController = require('./controllers/UsersController');
var permissionsController = require('./controllers/PermissionController');
var usersJsonController = require('./controllers/UsersJsonController');

var app = express();

var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use(cors());
require('./configs/DataBase');
app.use('/users', usersController);
app.use('/permission', permissionsController);
app.use('/usersJson', usersJsonController);

app.listen(8001, () => {
    console.log('The server is listening');
});