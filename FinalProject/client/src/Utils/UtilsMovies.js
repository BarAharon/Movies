import axios from 'axios';
const url = "http://localhost:8000/movies";

const getAllMovies = async() => {
    
    return await axios.get(url);
}

const getMovieById = (id) => {
    return axios.get(url + "/" + id);
}

const addMovie = (obj) => {
    return axios.post(url, obj);
}

const updateMovie = (id, obj) => {
    return axios.put(url+"/"+id, obj);
}

const deleteMovie = (id) => {
    return axios.delete(url+"/"+id);
}

export default {getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie}