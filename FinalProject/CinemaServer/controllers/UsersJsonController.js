var express = require('express');
var usersJsonBL = require('../models/UsersJsonBL');

var router = express.Router();  

router.route('/').get((req, res) => {
    usersJsonBL.getAllUsers().then((data) => {
        return res.json(data); 
    });
});

router.route('/:id').get((req, res) => {
    usersJsonBL.getUserById(req.params.id).then((data) => {
        return res.json(data);
    });
}); 

router.route('/').post((req, res) => {
    var newUser = req.body;
    usersJsonBL.addUser(newUser).then((data) => {
        return res.json("user is added");
    });
});

router.route('/:id').put((req, res) => {
    var id = req.params.id;
    var updateUser = req.body;

    usersJsonBL.updateUser(id, updateUser).then((data) => {
        return res.json("the update is complete");
    });    
});

router.route('/:id').delete((req, res) => {
    var id = req.params.id;

    usersJsonBL.deleteUser(id).then((data) => {
        return res.json("the delete is complete");
    });
});

module.exports = router;