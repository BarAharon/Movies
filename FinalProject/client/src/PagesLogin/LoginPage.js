import React, { useState, useEffect } from 'react';
import UtilsUsers from '../Utils/UtilsUsers';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [user, setUser] = useState({userName: "", password: "",});
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(async() => {
        var resp = await UtilsUsers.getAllUsers();
        var notExist = true;

        if (!(user.userName === "" && user.password === "")) {
            resp.data.forEach((item) => {
                if (item.userName === user.userName && item.password === user.password) {                   
                    navigate('/mainPage/'+ user.userName);
                    notExist = false;                    
                }
            });

            if (notExist) {
                alert("User doesn't exist");
            }
        }  
    }, [user]);

    const getUserName = (e) => {
        setUserName(e.target.value);
    }

    const getPassword = (e) => {
        setPassword(e.target.value);
    }

    const login = () => {
        var obj = {
            userName: userName,
            password: password
        }

        setUser(obj);
    }
    
    return (
        <div>
            <h2>Login Page</h2>
            <table align="center">
                <tbody>
                    <tr>
                        <td>User name:</td>
                        <td><input type="text" onChange={getUserName}/> </td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type="text" onChange={getPassword}/></td>
                    </tr>
                </tbody>
            </table>
            <input type="button" value="Login" onClick={login}/> <br />
            New User ?: <a href="createUser">Create Account</a>
        </div>
    );
}

export default LoginPage;