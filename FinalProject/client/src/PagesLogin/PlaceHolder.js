import React from 'react';
import CreateAccountPage from './CreateAccountPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from '../Pages/MainPage';
import EditUser from '../Pages/ManageUsersPages/EditUser';
import ManageUsers from '../Pages/ManageUsersPages/ManageUsers';

const PlaceHolder = () => {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<LoginPage />} />
                <Route path="/createUser" element={<CreateAccountPage />} />
                <Route path="/mainPage/:userName/*" element={<MainPage />} />                
            </Routes>
        </div>
    );
}

export default PlaceHolder;