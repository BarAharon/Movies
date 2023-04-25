import React, { useState, useEffect } from 'react';
import AddMovieComp from './AddMovieComp';
import AllMoviesComp from './AllMoviesComp';
import { useParams } from 'react-router-dom';
import UtilsUsers from '../../Utils/UtilsUsers';
import UtilsPermission from '../../Utils/UtilsPermission';

const Movies = (props) => {
    const [currentPage, setCurrentPage] = useState("");    
    const [userChoice, setUserChoice] = useState(""); 
    const [addMovieButton, setAddMovieButton] = useState("");
    const params = useParams(); 

    useEffect(async () => {
        setUserChoice("All Movies");

        var users = await UtilsUsers.getAllUsers();
        var id;

        users.data.forEach((user) => {
            if (user.userName === params.userName) {
                id = user._id;
            }
        });

        var permissions = await UtilsPermission.getUserPermissionById(id);
        permissions.data.permissions.forEach((permission) => {
            if (permission === "create movies") {
                setAddMovieButton(<input type="button" value="Add Movie" onClick={goToAddMovie}/>)
            }
        });      
    }, []);
    
    useEffect(() => {
        switch (userChoice) {
            case "All Movies":
                setCurrentPage(<AllMoviesComp goToMembers={props.goToMembers} movieName={props.movieName}/>);                
                break;

            case "Add Movie":
                setCurrentPage(<AddMovieComp goBack={goBack}/>);
                break;

            default:
                setCurrentPage("");
                break;
        }
    }, [userChoice]);

    const goBack = () => {
        setUserChoice("All Movies");
    }

    const goToAllMovies = () => {
        setUserChoice("All Movies");
    }

    const goToAddMovie = () => {
        setUserChoice("Add Movie");
    }

    return (
        <div>
            <h2>Movies</h2>
            <input type="button" value="All Movies" onClick={goToAllMovies}/>&nbsp;
            {addMovieButton}
            <br/><br/>
            {currentPage}
        </div>
    );
}

export default Movies;