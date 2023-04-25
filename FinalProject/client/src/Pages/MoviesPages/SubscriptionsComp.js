import React, { useState, useEffect } from 'react';
import '../../Css/MovieComp.css';
import UtilsSubscriptions from '../../Utils/UtilsSubscriptions';
import UtilsMembers from '../../Utils/UtilsMembers';

const SubscriptionsComp = (props) => {
    const [membersWatched, setMembersWatched] = useState([]);
    const [membersWatchedList, setMembersWatchedList] = useState("");

    useEffect(async () => {
        var membersArr = [];
        var resp = await UtilsSubscriptions.getAllSubscriptions();
        resp.data.forEach((subscription) => {
            subscription.movies.forEach((movie) => {
                if (props.movieId === movie.movieId) {
                    var obj = {
                        memberId: subscription.memberId,
                        memberName: "",
                        date: movie.date,
                    };

                    membersArr.push(obj);
                }
            });
        });



        var resp = await UtilsMembers.getAllMembers();

        resp.data.forEach((member) => {
            membersArr.forEach((obj, index) => {
                if (member._id === obj.memberId) {
                    membersArr[index].memberName = member.name;
                }
            });
        });

        setMembersWatched(membersArr);

    }, []);

    useEffect(() => {        
        var obj = membersWatched.map((member, index) => { 
            return (
                <li key={member.memberId}>
                    <span className="spanLink" onClick={goToMemeberPage}>{member.memberName}</span>, {new Date(member.date).toLocaleDateString()}
                </li>
            );
        });
        setMembersWatchedList(obj);
    }, [membersWatched]);

    const goToMemeberPage = (e) => {
        props.goToMembers(e.target.innerHTML);
    }

    return (
        <div className="divBorderSubscriptions">
            <b>Subscriptions Watched</b>
            <ul>
                {membersWatchedList}
            </ul>
        </div>
    );
}

export default SubscriptionsComp;