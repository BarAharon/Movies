const express = require('express');
const moviesBL = require('../models/MoviesBL');

const router = express.Router();

//GetAll
router.route('/').get(async (req, resp) => {
    var data = await moviesBL.getAllMovies();
    return resp.json(data);
});

//GetById
router.route('/:id').get(async (req, resp) => {
    var id = req.params.id;
    var data = await moviesBL.getMovieById(id);
    return resp.json(data);
});

//Post
router.route('/').post(async (req, resp) => {
    var newMovie = req.body;
    var answer = await moviesBL.createMovie(newMovie);
    return resp.json(answer);
});

//Put
router.route('/:id').put(async (req, resp) => {
    var id = req.params.id;
    var movieToUpdate = req.body;

    await moviesBL.updateMovie(id, movieToUpdate);

    return resp.json("The update was successful");
});

//Delete
router.route('/:id').delete(async (req, resp) => {
    var id = req.params.id;
    await moviesBL.deleteMovie(id);

    return resp.json("The delete was successful");
});

module.exports = router;





