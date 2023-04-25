import React, { useState, useEffect } from 'react';
import UtilsPermission from '../../Utils/UtilsPermission';
import UtilsUsers from '../../Utils/UtilsUsers';

import { useParams } from 'react-router-dom';
import AllMembersComp from './AllMembersComp';
import AddMemberComp from './AddMemberComp';

const Subscriptions = (props) => {
    const [currentPage, setCurrentPage] = useState("");    
    const [userChoice, setUserChoice] = useState(""); 
    const [addMemberButton, setAddMemberButton] = useState("");
    const params = useParams(); 

    useEffect(async () => {
        setUserChoice("All Members");

        var users = await UtilsUsers.getAllUsers();
        var id;

        users.data.forEach((user) => {
            if (user.userName === params.userName) {
                id = user._id;
            }
        });

        var permissions = await UtilsPermission.getUserPermissionById(id);
        permissions.data.permissions.forEach((permission) => {
            if (permission === "create subscriptions") {
                setAddMemberButton(<input type="button" value="Add Members" onClick={goToAddMember}/>)
            }
        });      
    }, []);
    
    useEffect(() => {
        switch (userChoice) {
            case "All Members":
                setCurrentPage(<AllMembersComp memberName={props.memberName} goToMovies={props.goToMovies}/>);                
                break;

            case "Add Members":
                setCurrentPage(<AddMemberComp goBack={goBack}/>);
                break;

            default:
                setCurrentPage("");
                break;
        }
    }, [userChoice]);

    const goBack = () => {
        setUserChoice("All Members");
    }

    const goToAllMembers = () => {
        setUserChoice("All Members");
    }

    const goToAddMember = () => {
        setUserChoice("Add Members");
    }

    return (
        <div>
            <h2>Subscriptions</h2>
            <input type="button" value="All Members" onClick={goToAllMembers}/>&nbsp;
            {addMemberButton}
            <br/><br/>
            {currentPage}
        </div>
    );
}

export default Subscriptions;