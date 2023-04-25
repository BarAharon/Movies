import React, { useState, useEffect } from 'react';
import UtilsMovies from '../../Utils/UtilsMovies';
import { useParams, useNavigate } from 'react-router-dom';
import '../../Css/MovieComp.css';

const EditMovies = () => {
    const [movie, setMovie] = useState({});    
    const [stringDate, setStringDate] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        var resp = await UtilsMovies.getMovieById(params.movieToEdit);
        var objMovie = {
            name: resp.data.name,
            genres: resp.data.genres,
            image: resp.data.image,
            premiered: resp.data.premiered
        }

        setMovie(objMovie);

        var date = new Date(objMovie.premiered);
        var stringDate = date.getFullYear() + "-";

        if (date.getMonth() + 1 < 10) {
            stringDate += "0" + (date.getMonth() + 1) + "-";
        }
        else {
            stringDate += (date.getMonth() + 1) + "-";
        }

        if (date.getDate() < 10) {
            stringDate += "0" + date.getDate();
        }
        else {
            stringDate += date.getDate();
        }

        setStringDate(stringDate);        
    }, []);

    const updateMovie = async () => {
        await UtilsMovies.updateMovie(params.movieToEdit, movie);
        navigate('/mainPage/' + params.userName);
    }

    const cancel = () => {
        navigate('/mainPage/' + params.userName);
    }

    const getName = (e) => {
        movie.name = e.target.value;       
    }

    const getGenres = (e) => {
        var genresArr = e.target.value.split(',');
        movie.genres = genresArr;        
    }

    const getImage = (e) => {
        movie.image = e.target.value;        
    }

    const getPremiered = (e) => {
        movie.premiered = e.target.value;        
    }

    return (
        <div align="center">
            <h2>Edit Movie: {movie.name}</h2>
            <table className="tableBorder">
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td><input type="text" defaultValue={movie.name} onChange={getName} /></td>
                    </tr>
                    <tr>
                        <td>Genres:</td>
                        <td><input type="text" defaultValue={movie.genres} onChange={getGenres} /></td>
                    </tr>
                    <tr>
                        <td>Image url:</td>
                        <td><input type="text" defaultValue={movie.image} onChange={getImage} /></td>
                    </tr>
                    <tr>
                        <td>Premiered:</td>
                        <td><input type="Date" defaultValue={stringDate} onChange={getPremiered} /></td>
                    </tr>
                </tbody>
            </table>
            <input type="button" value="update" onClick={updateMovie} />
            <input type="button" value="cancel" onClick={cancel} />
        </div>
    );
}

export default EditMovies;