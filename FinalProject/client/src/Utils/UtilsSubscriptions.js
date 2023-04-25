import axios from 'axios';
const url = "http://localhost:8000/subscriptions";

const getAllSubscriptions = async() => {
    
    return await axios.get(url);
}

const getSubscriptionById = (id) => {
    return axios.get(url + "/" + id);
}

const addSubscription = (obj) => {
    return axios.post(url, obj);
}

const updateSubscription = (id, obj) => {
    return axios.put(url+"/"+id, obj);
}

const deleteSubscription = (id) => {
    return axios.delete(url+"/"+id);
}

export default {getAllSubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription}