import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UtilsUsers from '../Utils/UtilsUsers';

const CreateAccountPage = () => {
    const [user, setUser] = useState({ userName: "", password: "", });
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(async () => {
        var resp = await UtilsUsers.getAllUsers();
        var notExist = true;

        if (user.userName !== "") {
            resp.data.forEach(async (item) => {
                if (item.userName === user.userName) {
                    var obj = {
                        userName: user.userName,
                        password: user.password
                    }                    
                    notExist = false;
                    await UtilsUsers.updateUser(item._id, obj);
                    navigate('/');
                    
                    
                }               
            });

            if (notExist) {               
                alert("User not exist\nCan't make an account");
            }
        }
    }, [user]);

    const getUserName = (e) => {
        setUserName(e.target.value);
    }

    const getPassword = (e) => {
        setPassword(e.target.value);
    }

    const createAccount = () => {
        var obj = {
            userName: userName,
            password: password
        }

        setUser(obj);
    }

    return (
        <div>
            <h2>Create an Account</h2>
            <table align="center">
                <tbody>
                    <tr>
                        <td>User name:</td>
                        <td><input type="text" onChange={getUserName} /> </td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type="text" onChange={getPassword} /></td>
                    </tr>
                </tbody>
            </table>
            <input type="button" value="Create" onClick={createAccount} /> <br />
        </div>
    );
}

export default CreateAccountPage;