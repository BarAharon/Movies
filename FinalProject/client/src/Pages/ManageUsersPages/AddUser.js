import React, { useState, useEffect} from 'react';
import '../../Css/UserCompCss.css';
import axios from 'axios';
import UtilsUsers from '../../Utils/UtilsUsers';
import UtilsUsersJson from '../../Utils/UtilsUsersJson';
import UtilsPermission from '../../Utils/UtilsPermission';

const AddUser = (props) => {       
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [sessionTimeOut, setSessionTimeOut] = useState(0);    
    const [permissionObj, setPermissionObj] = useState("");
    const [arrIsPermissionChecked, setArrIsPermissionChecked] = useState([false, false, false, false, false, false, false, false]);
    const permissionsOptions = ["view subscriptions", "create subscriptions", "delete subscriptions", "update subscriptions", "view movies", "create movies", "delete movies", "update movies"];
    const [userPermissions, setUserPermissions] = useState([]);

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

    const addUser = async() => {
        var obj = {           
            userName: userName,
            password: ""
        };

        if (firstName !== "" && lastName !== "" && userName !== "" && sessionTimeOut !== 0 && userPermissions.length > 0) {
            var isExist = await isUserNameAllreadExist();
            if (!isExist) {
                var id = await (await UtilsUsers.addUser(obj)).data._id;       
       
                await addUserJson(id);
                await addUserPermissions(id);
                props.goBack();
            }  
            else {
                alert("User Name allready exist\nPlease change your user name");
            }          
        }
        else {
            alert("Can't add user\nPlease add all data needed");
        }
        
    }

    const isUserNameAllreadExist = async () => {
        var resp = await UtilsUsers.getAllUsers();
        var isExist = false;
        resp.data.forEach((user) => {            
            if (user.userName === userName) {                
                isExist = true;
            }
        });

        console.log(isExist)

        return isExist;
    }

    const addUserJson = async (id) => {
        var obj = {
            id: id,      
            firstName: firstName,
            lastName: lastName,
            createdDate: Date.now(),
            sessionTimeOut: sessionTimeOut  
        }

        await UtilsUsersJson.addUser(obj);
    }

    const addUserPermissions = async (id) => {
        var obj = {
            id: id,
            permissions: userPermissions
        }

        await UtilsPermission.addUserPermission(obj);
    }

    const cancel = () => {        
        props.goBack();
    }

    const getUserFirstName = (e) => {
        setFirstName(e.target.value);       
    }

    const getUserLastName = (e) => {
        setLastName(e.target.value);
    }

    const getUserName = (e) => {
        setUserName(e.target.value);
    }

    const getUserSessionTimeOut = (e) => {
        setSessionTimeOut(+e.target.value);
    }

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

        var updatedUserPermissions = permissionsOptions;

        updatedUserPermissions = updatedUserPermissions.filter((item, index) => {
            if (newPermissions[index]) {
                return item;
            }
        });

        setUserPermissions(updatedUserPermissions);
    }

    return (
        <div align="center">
            <h2>Add New User</h2>
            <div className="divBorder">
                First Name: <input type="text" onChange={getUserFirstName} /> <br />
                Last Name:  <input type="text" onChange={getUserLastName} /> <br />
                User Name:  <input type="text" onChange={getUserName}/> <br />
                Session time out (Minutes): <input type="Number" onChange={getUserSessionTimeOut} /> <br />                
                Permissions: <br />
                {permissionObj}
                <br />
                <input type="button" value="Save" onClick={addUser}/>
                <input type="button" value="Cancel" onClick={cancel}/>
            </div>
        </div>
    );
}
export default AddUser;