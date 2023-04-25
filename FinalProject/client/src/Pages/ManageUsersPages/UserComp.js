import React, { useState, useEffect } from 'react';
import '../../Css/UserCompCss.css';
import axios from 'axios';
import UtilsUsers from '../../Utils/UtilsUsers';
import UtilsPermission from '../../Utils/UtilsPermission';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import UtilsUsersJson from '../../Utils/UtilsUsersJson';

const UserComp = (props) => {   
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const params = useParams();

    useEffect(async () => {
        var respUser = await UtilsUsers.getUserById(props.data.id);
        var respPermissions = await UtilsPermission.getUserPermissionById(props.data.id);
        var arrPermissions = respPermissions.data.permissions.map(item => {
            return (item + ", ");
        });

        arrPermissions[arrPermissions.length - 1] = arrPermissions[arrPermissions.length - 1].substring(0, arrPermissions[arrPermissions.length - 1].length - 2);

        var createdDate = new Date(props.data.createdDate);
        var obj = {
            id: props.data.id,
            name: props.data.firstName + " " + props.data.lastName,
            userName: respUser.data.userName,
            sessionTimeOut: props.data.sessionTimeOut,
            createdDate: createdDate.toLocaleDateString(),
            permissions: arrPermissions
        }

        setUser(obj);
    }, []);

    const goToEditUserPage = () => {
        navigate('/mainPage/' + params.userName + '/edit/' + user.id);
    }

    const deleteUser = async () => {
        if (user.userName !== "Bar") {
            await UtilsUsers.deleteUser(props.data.id);
            await UtilsPermission.deleteUserPermission(props.data.id);
            await UtilsUsersJson.deleteUser(props.data.id);
            props.userIsDeleted();
        }  
        else {
            alert("Can't delete");
        }      
    }

    return (
        <div className="divBorder">
            Name: {user.name} <br />
            User Name: {user.userName} <br />
            Session time out: {user.sessionTimeOut} <br />
            Created date: {user.createdDate} <br />
            Permissions: {user.permissions} <br />
            <br />
            <input type="button" value="edit" onClick={goToEditUserPage} />
            <input type="button" value="delete" onClick={deleteUser} />
        </div>
    );
}

export default UserComp;