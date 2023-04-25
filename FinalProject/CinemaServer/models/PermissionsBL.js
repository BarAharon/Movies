var jsonfile = require('jsonfile');

const getAllUsersPermission = () => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./json/Permission.json', (err, data) => {
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

const getPermissionByUserId = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./json/Permission.json', (err, data) => {
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

const addNewUserPermission = (newUserPermission) => {
    return new Promise((resolve, reject) => {       
        jsonfile.readFile('./json/Permission.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                data.push(newUserPermission);
                jsonfile.writeFile('./json/Permission.json', data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {                        
                        resolve(newUserPermission);
                    }
                });
            }
        }); 
    });  
}

const updateUserPermission = (id, userPermission) => {
    return new Promise((resolve, reject) => { 
        jsonfile.readFile('./json/Permission.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var index = data.findIndex(item => item.id == id);
                data[index] = userPermission;
                
                jsonfile.writeFile('./json/Permission.json', data, (err) => {
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

const deleteUserPermission = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./json/Permission.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                var index = data.findIndex((item) => item.id == id);
                data.splice(index, 1);
                
                jsonfile.writeFile('./json/Permission.json', data, (err) => {
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

module.exports = {getAllUsersPermission, getPermissionByUserId, addNewUserPermission, updateUserPermission, deleteUserPermission}
