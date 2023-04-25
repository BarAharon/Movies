import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import EditMembers from './EditMembers';
import Subscriptions from './Subscriptions';

const PlaceHolderSubscriptions = (props) => {
    return(
        <div>
            <Routes>
                <Route path="/" exact element={<Subscriptions memberName={props.memberName} goToMovies={props.goToMovies}/>} />  
                <Route path="/edit/:memberToEdit" exact element={<EditMembers />} />              
            </Routes>
        </div>
    );
}

export default PlaceHolderSubscriptions;