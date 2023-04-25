var moviesSchema = require('../schema/MoviesSchema');

const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        moviesSchema.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
        moviesSchema.findById(id, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                if(data !== null) {
                    resolve(data);
                }
                else{
                    resolve("the movie is not found");
                }
            }
        });
    });
}

const createAPIMovie = (newMovie) => {
    return new Promise((resolve, reject) => {        
        var movieToAdd = new moviesSchema({
            name: newMovie.name,
            genres: newMovie.genres,
            image: newMovie.image.medium,
            premiered: newMovie.premiered 
        });

        moviesSchema.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {                
                if (data.length === 0) {
                    movieToAdd.save((err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(movieToAdd);
                        }
                    });
                }
            }
        });
    });
}

const createMovie = (newMovie) => {
    return new Promise((resolve, reject) => {
        var movieToAdd = new moviesSchema({
            name: newMovie.name,
            genres: newMovie.genres,
            image: newMovie.image,
            premiered: newMovie.premiered            
        });

        movieToAdd.save((err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(movieToAdd);
            }
        })
    })
}

const updateMovie = (id, movie) => {
    return new Promise((resolve, reject) => {
        var movieToUpdate = {
            name: movie.name,
            genres: movie.genres,
            image: movie.image,
            premiered: movie.premiered   
        };

        moviesSchema.findByIdAndUpdate(id, movieToUpdate, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("movie was updated!");
            }
        });
    });
}

const deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        moviesSchema.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("movie was deleted!!!")
            }
        })
    })
}


module.exports = { getAllMovies, getMovieById, createAPIMovie, createMovie, updateMovie, deleteMovie }