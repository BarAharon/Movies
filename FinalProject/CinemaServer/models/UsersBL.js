var usersSchema = require('../schema/UsersSchema');

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        usersSchema.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        usersSchema.findById(id, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                if(data !== null) {
                    resolve(data);
                }
                else{
                    resolve("the user is not found");
                }
            }
        });
    });
}

const createUser = (newUser) => {
    return new Promise((resolve, reject) => {
        var userToAdd = new usersSchema({
            userName: newUser.userName,
            password: newUser.password           
        });

        userToAdd.save((err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(userToAdd);
            }
        })
    })
}

const updateUser = (id, user) => {
    return new Promise((resolve, reject) => {
        var userToUpdate = {
            userName: user.userName,
            password: user.password  
        };

        usersSchema.findByIdAndUpdate(id, userToUpdate, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("user was updated!");
            }
        });
    });
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        usersSchema.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("user was deleted!!!")
            }
        })
    })
}


module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser }