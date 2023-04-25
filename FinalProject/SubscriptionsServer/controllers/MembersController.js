const express = require('express');
const membersBL = require('../models/MembersBL');

const router = express.Router();

//GetAll
router.route('/').get(async (req, resp) => {
    var data = await membersBL.getAllMembers();
    return resp.json(data);
});

//GetById
router.route('/:id').get(async (req, resp) => {
    var id = req.params.id;
    var data = await membersBL.getMemberById(id);
    return resp.json(data);
});

//Post
router.route('/').post(async (req, resp) => {
    var newMember = req.body;
    var answer = await membersBL.createMember(newMember);
    return resp.json(answer);
});

//Put
router.route('/:id').put(async (req, resp) => {
    var id = req.params.id;
    var memberToUpdate = req.body;

    await membersBL.updateMember(id, memberToUpdate);

    return resp.json("The update was successful");
});

//Delete
router.route('/:id').delete(async (req, resp) => {
    var id = req.params.id;
    await membersBL.deleteMember(id);

    return resp.json("The delete was successful");
});

module.exports = router;





