var axios = require('axios');
const url = "https://jsonplaceholder.typicode.com/users";

const getAllMembers = async() => {
    
    return await axios.get(url);
}

const getMemberById = async(id) => {
    
    return await axios.get(url + "/" + id);
}

module.exports =  {getAllMembers, getMemberById}