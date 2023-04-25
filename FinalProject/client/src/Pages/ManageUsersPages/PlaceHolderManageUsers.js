import React, {  } from 'react';
import { Routes, Route } from 'react-router-dom';
import EditUser from './EditUser';
import ManageUsers from './ManageUsers';

const PlaceHolderManageUsers = () => {    
    return (
        <div>
            <Routes>              
                <Route path="/" exact element={<ManageUsers />} />
                <Route path="/edit/:userToEdit" exact element={<EditUser />} />                
            </Routes>
        </div>
    );
}

export default PlaceHolderManageUsers;