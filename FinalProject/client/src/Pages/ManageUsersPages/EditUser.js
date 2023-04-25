import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UtilsUsers from '../../Utils/UtilsUsers';
import UtilsPermission from '../../Utils/UtilsPermission';
import UtilsUsersJson from '../../Utils/UtilsUsersJson';
import '../../Css/UserCompCss.css';
import axios from 'axios';

const EditUser = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ permissions: [], name: "" });
    const [arrIsPermissionChecked, setArrIsPermissionChecked] = useState([false, false, false, false, false, false, false, false]);
    const [permissionsOptions] = useState(["view subscriptions", "create subscriptions", "delete subscriptions", "update subscriptions", "view movies", "create movies", "delete movies", "update movies"]);
    const [permissionObj, setPermissionObj] = useState("");

    useEffect(async () => {
        var respUser = await UtilsUsers.getUserById(params.userToEdit);
        var respUserjson = await UtilsUsersJson.getUserById(params.userToEdit);
        var respPermissions = await UtilsPermission.getUserPermissionById(params.userToEdit);

        var obj = {
            name: respUserjson.data.firstName + " " + respUserjson.data.lastName,
            userName: respUser.data.userName,
            sessionTimeOut: respUserjson.data.sessionTimeOut,
            createdDate: respUserjson.data.createdDate,
            permissions: respPermissions.data.permissions
        }

        setUser(obj);
       
        var arr = [false, false, false, false, false, false, false, false];
        for (var i = 0; i < permissionsOptions.length; i++) {
            respPermissions.data.permissions.forEach(item => {
                if (item === permissionsOptions[i]) {
                    arr[i] = true;
                }
            });
        }

        setArrIsPermissionChecked(arr);
    }, []);

    useEffect(() => {
        var obj = permissionsOptions.map((permission, index) => {
            return (
                <div key={index}>
                    <input type="checkbox" value={permission} checked={arrIsPermissionChecked[index]} onChange={changePermissions} /> {permission}
                </div>
            );
        });

        setPermissionObj(obj);
    }, [arrIsPermissionChecked]);

    const changePermissions = (e) => {
        var newPermissions = permissionsOptions.map((item, index) => {
            if (e.target.value === item) {
                return !arrIsPermissionChecked[index];
            }
            else {
                return arrIsPermissionChecked[index];
            }
        });

        if (newPermissions[1] || newPermissions[2] || newPermissions[3]) {
            newPermissions[0] = true;
        }

        if (newPermissions[5] || newPermissions[6] || newPermissions[7]) {
            newPermissions[4] = true;
        }

        setArrIsPermissionChecked(newPermissions);

        var obj = user;

        var updatedUserPermissions = permissionsOptions;

        updatedUserPermissions = updatedUserPermissions.filter((item, index) => {
            if (newPermissions[index]) {
                return item;
            }
        });

        obj.permissions = updatedUserPermissions;
        setUser(obj);       
    }

    const setUserFirstName = (e) => {
        var obj = user;

        obj.name = e.target.value + " " + obj.name.split(' ')[1];
        setUser(obj);
    }

    const setUserLastName = (e) => {
        var obj = user;

        obj.name = obj.name.split(' ')[0] + " " + e.target.value;
        setUser(obj);
    }

    const setUserSessionTimeOut = (e) => {
        var obj = user;

        obj.sessionTimeOut = +e.target.value;
        setUser(obj);
    }

    const setUserName = (e) => {
        var obj = user;

        if (user.userName !== "Bar") {
            obj.userName = e.target.value;
            setUser(obj);
        }       
    }

    const updateUser = () => {
        updateUserDatabase();
        updateUserJson();
        updateUserPermission();
        navigate('/mainPage/' + params.userName);
    }

    const cancel = () => {
        navigate('/mainPage/' + params.userName);
        
    }

    const updateUserDatabase = async() => {
        var resp = await UtilsUsers.getUserById(params.userToEdit);
        var updateUser = {           
            userName: user.userName,
            password: resp.data.password            
        }

        await UtilsUsers.updateUser(params.userToEdit, updateUser);
    }

    const updateUserJson = async() => {
        var updateUser = {  
            id: params.userToEdit,      
            firstName: user.name.split(' ')[0],
            lastName: user.name.split(' ')[1],
            createdDate:   user.createdDate,
            sessionTimeOut: user.sessionTimeOut        
        }

        await UtilsUsersJson.updateUser(params.userToEdit, updateUser);
    }

    const updateUserPermission = async() => {
        var updatePermission = {   
            id: params.userToEdit,        
            permissions: user.permissions
        }

        await UtilsPermission.updateUserPermission(params.userToEdit, updatePermission);
    }

    return (
        <div align="center">
            <h2>Users</h2>
            <h3>Edit User: {params.userName}</h3>
            <div className="divBorder">
                First Name: <input type="text" defaultValue={user.name.split(' ')[0]} onChange={setUserFirstName} /> <br />
                Last Name:  <input type="text" defaultValue={user.name.split(' ')[1]} onChange={setUserLastName} /> <br />
                User Name:  <input type="text" defaultValue={user.userName} onChange={setUserName}/> <br />
                Session time out (Minutes): <input type="Number" defaultValue={user.sessionTimeOut} onChange={setUserSessionTimeOut} /> <br />
                Created date: {new Date(user.createdDate).toLocaleDateString()} <br />
                Permissions: <br />
                {permissionObj}
                <br />
                <input type="button" value="Update" onClick={updateUser}/>
                <input type="button" value="Cancel" onClick={cancel}/>
            </div>
        </div>
    );
}

export default EditUser;