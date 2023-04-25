import axios from 'axios';
const url = "http://localhost:8001/usersJson";

const getAllUsers = async() => {
    
    return await axios.get(url);
}

const getUserById = (id) => {
    return axios.get(url + "/" + id);
}

const addUser = (obj) => {
    return axios.post(url, obj);
}

const updateUser = (id, obj) => {
    return axios.put(url+"/"+id, obj);
}

const deleteUser = (id) => {
    return axios.delete(url+"/"+id);
}

export default  {getAllUsers, getUserById, addUser, updateUser, deleteUser}