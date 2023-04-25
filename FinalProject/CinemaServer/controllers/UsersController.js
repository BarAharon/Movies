const express = require('express');
const usersBL = require('../models/UsersBL');

const router = express.Router();

//GetAll
router.route('/').get(async (req, resp) => {
    var data = await usersBL.getAllUsers();
    return resp.json(data);
});

//GetById
router.route('/:id').get(async (req, resp) => {
    var id = req.params.id;
    var data = await usersBL.getUserById(id);
    return resp.json(data);
});

//Post
router.route('/').post(async (req, resp) => {
    var newUser = req.body;
    var answer = await usersBL.createUser(newUser);
    return resp.json(answer);
});

//Put
router.route('/:id').put(async (req, resp) => {
    var id = req.params.id;
    var userToUpdate = req.body;

    await usersBL.updateUser(id, userToUpdate);

    return resp.json("The update was successful");
});

//Delete
router.route('/:id').delete(async (req, resp) => {
    var id = req.params.id;
    await usersBL.deleteUser(id);

    return resp.json("The delete was successful");
});

module.exports = router;





