var jsonfile = require('jsonfile');

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./json/users.json', (err, data) => {
            if (err) {            
                reject(err);
            }
            else {
                console.log(data);
                resolve(data);
            }
        }); 
    });  
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./json/users.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var arr = data.filter(user => user.id == id);                
                if (arr.length > 0) {
                    resolve(arr[0]);
                }
            }
        });
    });     
}

const addUser = (newUser) => {
    return new Promise((resolve, reject) => {       
        jsonfile.readFile('./json/users.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                data.push(newUser);
                jsonfile.writeFile('./json/users.json', data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {                        
                        resolve(newUser);
                    }
                });
            }
        }); 
    });  
}

const updateUser = (id, user) => {
    return new Promise((resolve, reject) => { 
        jsonfile.readFile('./json/users.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var index = data.findIndex(item => item.id == id);
                data[index] = user;
                
                jsonfile.writeFile('./json/users.json', data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }
        });
    });    
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./json/users.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var index = data.findIndex((item) => item.id == id);
                data.splice(index, 1);
                
                jsonfile.writeFile('./json/users.json', data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }
        });
    });    
}

module.exports = {getAllUsers, getUserById, addUser, updateUser, deleteUser}
