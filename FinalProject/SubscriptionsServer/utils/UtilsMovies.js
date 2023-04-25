var axios = require('axios');
const url = "https://api.tvmaze.com/shows";

const getAllMovies = async() => {    
    return await axios.get(url);
}

const getMoviesById = async(id) => {   
    return await axios.get(url + "/" + id);
}


module.exports =  {getAllMovies, getMoviesById}