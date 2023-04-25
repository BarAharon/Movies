import axios from 'axios';
const url = "http://localhost:8001/permission";

const getAllUsersPermission = async() => {
    
    return await axios.get(url);
}

const getUserPermissionById = (id) => {
    return axios.get(url + "/" + id);
}

const addUserPermission = (obj) => {
    return axios.post(url, obj);
}

const updateUserPermission = (id, obj) => {
    return axios.put(url+"/"+id, obj);
}

const deleteUserPermission = (id) => {
    return axios.delete(url+"/"+id);
}

export default {getAllUsersPermission, getUserPermissionById, addUserPermission, updateUserPermission, deleteUserPermission}