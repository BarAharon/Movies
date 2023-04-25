const express = require('express');
const subscriptionsBL = require('../models/SubscriptionsBL');

const router = express.Router();

//GetAll
router.route('/').get(async (req, resp) => {
    var data = await subscriptionsBL.getAllSubscriptions();
    return resp.json(data);
});

//GetById
router.route('/:id').get(async (req, resp) => {
    var id = req.params.id;
    var data = await subscriptionsBL.getSubscriptionById(id);
    return resp.json(data);
});

//Post
router.route('/').post(async (req, resp) => {
    var newSubscription = req.body;
    var answer = await subscriptionsBL.createSubscription(newSubscription);
    return resp.json(answer);
});

//Put
router.route('/:id').put(async (req, resp) => {
    var id = req.params.id;
    var subscriptionToUpdate = req.body;

    await subscriptionsBL.updateSubscription(id, subscriptionToUpdate);

    return resp.json("The update was successful");
});

//Delete
router.route('/:id').delete(async (req, resp) => {
    var id = req.params.id;
    await subscriptionsBL.deleteSubscription(id);

    return resp.json("The delete was successful");
});

module.exports = router;





