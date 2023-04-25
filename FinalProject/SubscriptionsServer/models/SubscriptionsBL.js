var subscriptionsSchema = require('../schema/subscriptionsSchema');

const getAllSubscriptions = () => {
    return new Promise((resolve, reject) => {
        subscriptionsSchema.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

const getSubscriptionById = (id) => {
    return new Promise((resolve, reject) => {
        subscriptionsSchema.findById(id, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                if(data !== null) {
                    resolve(data);
                }
                else{
                    resolve("the Subscription is not found");
                }
            }
        });
    });
}

const createSubscription = (newSubscription) => {
    return new Promise((resolve, reject) => {
        var subscriptionToAdd = new subscriptionsSchema({
            memberId: newSubscription.memberId,
            movies: newSubscription.movies
        });

        console.log(newSubscription);

        subscriptionToAdd.save((err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(subscriptionToAdd);
            }
        })
    })
}

const updateSubscription = (id, subscription) => {
    return new Promise((resolve, reject) => {
        var subscriptionToUpdate = {

            memberId: subscription.memberId,
            movies: subscription.movies
        };

        subscriptionsSchema.findByIdAndUpdate(id, subscriptionToUpdate, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("subscription was updated!");
            }
        });
    });
}

const deleteSubscription = (id) => {
    return new Promise((resolve, reject) => {
        subscriptionsSchema.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("subscription was deleted!!!")
            }
        })
    })
}


module.exports = { getAllSubscriptions, getSubscriptionById, createSubscription, updateSubscription, deleteSubscription }