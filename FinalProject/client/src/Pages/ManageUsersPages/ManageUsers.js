import React, { useState, useEffect } from 'react';
import AddUser from './AddUser';
import AllUsersComp from './AllUsersComp';  

const ManageUsers = () => {    
    const [currentPage, setCurrentPage] = useState("");    
    const [userChoice, setUserChoice] = useState(""); 
    
    useEffect(() => {
        setUserChoice("All Users");
    }, [])

    useEffect(() => {
        switch (userChoice) {
            case "All Users":
                setCurrentPage(<AllUsersComp />);                
                break;

            case "Add User":
                setCurrentPage(<AddUser goBack={goBack}/>);
                break;

            default:
                setCurrentPage("");
                break;
        }
    }, [userChoice]);

    const goBack = () => {
        setUserChoice("All Users");
    }

    const goToAllUsers = () => {
        setUserChoice("All Users");
    }

    const goToAddUser = () => {
        setUserChoice("Add User");
    }

    return (
        <div>
            <h2>Users</h2>
            <input type="button" value="All Users" onClick={goToAllUsers}/>&nbsp;
            <input type="button" value="Add User" onClick={goToAddUser}/> 
            <br/><br/>
            {currentPage}
        </div>
    );
}

export default ManageUsers;