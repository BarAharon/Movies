import axios from 'axios';
const url = "http://localhost:8000/members";

const getAllMembers = async() => {
    
    return await axios.get(url);
}

const getMemberById = (id) => {
    return axios.get(url + "/" + id);
}

const addMember = (obj) => {
    return axios.post(url, obj);
}

const updateMember = (id, obj) => {
    return axios.put(url+"/"+id, obj);
}

const deleteMember = (id) => {
    return axios.delete(url+"/"+id);
}

export default {getAllMembers, getMemberById, addMember, updateMember, deleteMember}