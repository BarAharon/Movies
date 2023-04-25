import React, { useState, useEffect } from 'react';
import UtilsUsers from '../../Utils/UtilsUsersJson';
import UserComp from './UserComp';

const AllUsersComp = () => {
    const [users, setUsers] = useState([]);
    const [usersList, setUsersList] = useState("");

    useEffect(async () => {
        var resp = await UtilsUsers.getAllUsers();
        setUsers(resp.data);
    }, []);

    useEffect(() => {
        var obj = users.map((item) => {            
            return (
                <div key={item.id}>
                    <UserComp data={item} userIsDeleted={userIsDeleted} /><br />
                </div>
            );
        });

        setUsersList(obj)
    }, [users]);

    const userIsDeleted = async () => {
        var resp = await UtilsUsers.getAllUsers();
        setUsers(resp.data);
    }

    return (
        <div align="center">
            {usersList}
        </div>
    );
}

export default AllUsersComp;