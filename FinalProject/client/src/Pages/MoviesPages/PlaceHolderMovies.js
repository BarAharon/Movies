import React, {  } from 'react';
import { Routes, Route } from 'react-router-dom';
import EditMovies from './EditMovies';
import Movies from './Movies';

const PlaceHolderManageUsers = (props) => {    
    return (
        <div>
            <Routes>              
                <Route path="/" exact element={<Movies goToMembers={props.goToMembers} movieName={props.movieName}/>} />  
                <Route path="/edit/:movieToEdit" exact element={<EditMovies />} />                                
            </Routes>
        </div>
    );
}

export default PlaceHolderManageUsers;