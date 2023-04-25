import React, { useState, useEffect } from 'react';
import '../../Css/SubscriptionsComp.css';
import MoviesWatchedComp from './MoviesWatchedComp';
import { useParams, useNavigate } from 'react-router-dom';
import UtilsUsers from '../../Utils/UtilsUsers';
import UtilsPermission from '../../Utils/UtilsPermission';
import UtilsMembers from '../../Utils/UtilsMembers';
import UtilsSubscriptions from '../../Utils/UtilsSubscriptions';

const MemberComp = (props) => {
    const [editMembersButton, setEditMembersButton] = useState("");
    const [deleteMembersButton, setDeleteMembersButton] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(async () => {
        var users = await UtilsUsers.getAllUsers();
        var id;

        users.data.forEach((user) => {
            if (user.userName === params.userName) {
                id = user._id;
            }
        });

        var permissions = await UtilsPermission.getUserPermissionById(id);

        permissions.data.permissions.forEach((permission) => {
            if (permission === "update subscriptions") {
                setEditMembersButton(<input type="button" value="edit" onClick={goToEditSubscriptionPage} />)
            }

            if (permission === "delete subscriptions") {
                setDeleteMembersButton(<input type="button" value="delete" onClick={deleteSubscription} />)
            }
        });
    }, []);

    const goToEditSubscriptionPage = () => {
        navigate('/mainPage/' + params.userName + '/edit/' + props.data._id);
    }

    const deleteSubscription = async () => {
        await UtilsMembers.deleteMember(props.data._id);
        var resp = await UtilsSubscriptions.getAllSubscriptions();
        var subscription = resp.data.filter(subscription => subscription.memberId === props.data._id);
        if (subscription.length > 0) {
            await UtilsSubscriptions.deleteSubscription(subscription[0]._id);
        }
        
        props.memberIsDeleted();
    }


    return (
        <div className="divBorder">
            <h3>{props.data.name}</h3>
            Email: {props.data.email}<br />
            City: {props.data.city} <br />
            {editMembersButton}
            {deleteMembersButton}
            <br /><br />
            <MoviesWatchedComp id={props.data._id} goToMovies={props.goToMovies} />
        </div>
    );
}

export default MemberComp;