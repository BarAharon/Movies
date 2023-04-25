var express = require('express');
var permissionBL = require('../models/PermissionsBL');

var router = express.Router();  

router.route('/').get((req, res) => {
    permissionBL.getAllUsersPermission().then((data) => {
        return res.json(data); 
    });
});

router.route('/:id').get((req, res) => {
    permissionBL.getPermissionByUserId(req.params.id).then((data) => {
        return res.json(data);
    });
}); 

router.route('/').post((req, res) => {
    var newUserPermission = req.body;
    permissionBL.addNewUserPermission(newUserPermission).then((data) => {
        return res.json("user permission is added");
    });
});

router.route('/:id').put((req, res) => {
    var id = req.params.id;
    var updateUserPermission = req.body;

    permissionBL.updateUserPermission(id, updateUserPermission).then((data) => {
        return res.json("the update is complete");
    });    
});

router.route('/:id').delete((req, res) => {
    var id = req.params.id;

    permissionBL.deleteUserPermission(id).then((data) => {
        return res.json("the delete is complete");
    });
});

module.exports = router;