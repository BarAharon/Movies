import React, { useState, useEffect } from 'react';
import '../../Css/MovieComp.css'
import UtilsPermission from '../../Utils/UtilsPermission';
import UtilsUsers from '../../Utils/UtilsUsers';
import SubscriptionsComp from './SubscriptionsComp';
import UtilsMovies from '../../Utils/UtilsMovies';
import UtilsSubscriptions from '../../Utils/UtilsSubscriptions';
import { useParams, useNavigate } from 'react-router-dom';

const MovieComp = (props) => {
    const params = useParams();
    const [editMoviesButton, setEditMoviesButton] = useState("");
    const [deleteMoviesButton, setDeleteMoviesButton] = useState("");
    const navigate = useNavigate();

    useEffect(async () => {
        var users = await UtilsUsers.getAllUsers();
        var id;

        users.data.forEach((user) => {
            if (user.userName === params.userName) {
                id = user._id;
            }
        });

        var permissions = await UtilsPermission.getUserPermissionById(id);

        permissions.data.permissions.forEach((permission) => {
            if (permission === "update movies") {
                setEditMoviesButton(<input type="button" value="edit" onClick={goToEditMoviePage} />)
            }

            if (permission === "delete movies") {
                setDeleteMoviesButton(<input type="button" value="delete" onClick={deleteMovie} />)
            }
        });
    }, []);

    var genreString = "";
    props.data.genres.forEach((genre) => {
        genreString += genre + ", ";
    });

    genreString = genreString.substring(0, genreString.length - 2);

    const goToEditMoviePage = () => {
        navigate('/mainPage/' + params.userName + '/edit/' + props.data._id);
    }

    const deleteMovie = async () => {
        await UtilsMovies.deleteMovie(props.data._id);
        var resp = await UtilsSubscriptions.getAllSubscriptions();
        var saveMovieId;
        var newSubscriptions = resp.data.map((item) => {
            var index = item.movies.findIndex(movie => movie.movieId === props.data._id);
            if (index !== -1) {
                saveMovieId = item.movies[index].movieId;
                item.movies.splice(index, 1);                
            }

            return item;
        });
     
        await newSubscriptions.forEach(async (item) => {       
            if (item.movies.length > 0) {               
                await item.movies.forEach(async (movie) => {                    
                    if (saveMovieId === props.data._id) {
                        await UtilsSubscriptions.updateSubscription(item._id, item);
                    }
                });
            }
            else {                  
                await UtilsSubscriptions.deleteSubscription(item._id);                
            }           
           
        });
        props.movieIsDeleted();
    }

    return (
        <div className="divBorder">
            <b>{props.data.name}, {new Date(props.data.premiered).getFullYear()}</b><br />
            Genres: {genreString}<br />
            <table>
                <tbody>
                    <tr>
                        <td><img src={props.data.image} alt="no img" /></td>
                        <td><SubscriptionsComp movieId={props.data._id} goToMembers={props.goToMembers} /></td>
                    </tr>
                </tbody>
            </table>
            {editMoviesButton}
            {deleteMoviesButton}
        </div>
    );
}

export default MovieComp;