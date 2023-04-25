import React, { useState, useEffect } from 'react';
import UtilsMovies from '../../Utils/UtilsMovies';
import '../../Css/MovieComp.css';

const AddMovieComp = (props) => {
    const [name, setName] = useState("");
    const [genres, setGenres] = useState("");
    const [image, setImage] = useState("");
    const [premiered, setPremiered] = useState("");

    const getName = (e) => {
        setName(e.target.value);
    }

    const getGenres = (e) => {
        setGenres(e.target.value);
    }

    const getImage = (e) => {
        setImage(e.target.value);
    }

    const getPremiered = (e) => {
        setPremiered(e.target.value);
    }

    const cancel = () => {        
        props.goBack();
    }

    const addMovie = async() => {
        var genresArr = genres.split(',');

        var newMovie = {
            name: name,
            genres: genresArr,
            image: image,
            premiered: premiered
        }

        if (name !== "" && genres !== "" && image !== ""  && premiered !== "") {
            await UtilsMovies.addMovie(newMovie);
            props.goBack();
        }
        else {
            alert("Can't add movie\nPlease add all data needed");
        }       
    }

    return (
        <div align="center" >
            <table className="tableBorder">
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td><input type="text" onChange={getName}/></td>
                    </tr>
                    <tr>
                        <td>Genres:</td>
                        <td><input type="text" onChange={getGenres}/></td>
                    </tr>
                    <tr>
                        <td>Image url:</td>
                        <td><input type="text" onChange={getImage}/></td>
                    </tr>
                    <tr>
                        <td>Premiered:</td>
                        <td><input type="Date" onChange={getPremiered}/></td>
                    </tr>
                </tbody>
            </table>           
            <input type="button" value="save" onClick={addMovie}/>
            <input type="button" value="cancel" onClick={cancel}/>
        </div>
    );
}

export default AddMovieComp;