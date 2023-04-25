import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UtilsPermission from '../Utils/UtilsPermission';
import UtilsUsers from '../Utils/UtilsUsers';
import PlaceHolderManageUsers from './ManageUsersPages/PlaceHolderManageUsers';
import PlaceHolderMovies from './MoviesPages/PlaceHolderMovies';
import PlaceHolderSubscriptions from './SubscriptionsPages/PlaceHolderSubscriptions';
import { UserProvider } from './UserContext';

const MainPage = () => {
    const [userName, setUserName] = useState("");
    const [currentPage, setCurrentPage] = useState("");
    const [adminOption, setAdminOption] = useState("");
    const [viewMovies, setViewMovies] = useState("");
    const [viewSubscriptions, setViewSubscriptions] = useState("");
    const [userChoice, setUserChoice] = useState("");
    const [specificMovie, setSpecificMovie] = useState("");
    const [specificMember, setSpecificMember] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setUserName(params.userName);
        isUserAdmin();
        hasViewMoviePermission();
        hasViewSubscriptionsPermission();
    }, [userName]);

    const isUserAdmin = () => {
        if (userName === "Bar") {
            setAdminOption(<span><input type="button" value="Users Management" onClick={goToManageUsers} />&nbsp;</span>);
        }
    }

    const hasViewMoviePermission = async () => {
        var users = await UtilsUsers.getAllUsers();
        var id;

        users.data.forEach((user) => {
            if (user.userName === userName) {
                id = user._id;
            }
        });

        var permissions = await UtilsPermission.getUserPermissionById(id);
        console.log(permissions)

        permissions.data.permissions.forEach((permission) => {
            if (permission === "view movies") {
                setViewMovies(<span> <input type="button" value="Movies" onClick={goToMovies} /></span>)
            }
        });
    }

    const hasViewSubscriptionsPermission = async () => {
        var users = await UtilsUsers.getAllUsers();
        var id;

        users.data.forEach((user) => {
            if (user.userName === userName) {
                id = user._id;
            }
        });

        var permissions = await UtilsPermission.getUserPermissionById(id);

        permissions.data.permissions.forEach((permission) => {
            if (permission === "view subscriptions") {
                setViewSubscriptions(<span> <input type="button" value="Subscriptions" onClick={goToSubscriptions} />&nbsp;</span>)
            }
        });
    }

    useEffect(() => {
        switch (userChoice) {
            case "Users Management":
                setCurrentPage(<PlaceHolderManageUsers />);
                navigate('/mainPage/' + params.userName);
                break;

            case "Movies":
                setCurrentPage(<PlaceHolderMovies goToMembers={goToSpecificMember} movieName={specificMovie}/>);
                navigate('/mainPage/' + params.userName);
                break;

            case "Subscriptions":
                setCurrentPage(<PlaceHolderSubscriptions goToMovies={goToSpecificMovie} memberName={specificMember}/>);
                navigate('/mainPage/' + params.userName);
                break;
            default:
                break;
        }
    }, [userChoice]);

    const goToManageUsers = () => {
        setUserChoice("Users Management");
    }

    const goToMovies = () => {
        setSpecificMovie("");
        setUserChoice("Movies");
    }

    const goToSpecificMovie = (name) => {              
        setSpecificMovie(name);
        setUserChoice("Movies");        
    }

    const goToSpecificMember = (name) => {              
        setSpecificMember(name);
        setUserChoice("Subscriptions");        
    }

    const goToSubscriptions = () => {
        setSpecificMember("");
        setUserChoice("Subscriptions");
    }

    const logout = () => {
        navigate('/');
    }

    return (
        <div>
            {viewMovies}
            {viewSubscriptions}
            {adminOption}
            <input type="button" value="Log Out" onClick={logout} />&nbsp;
            Hello {userName}
            {currentPage}
        </div>
    );
}

export default MainPage;