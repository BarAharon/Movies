import React, { useState, useEffect } from 'react';
import '../../Css/SubscriptionsComp.css';
import UtilsSubscriptions from '../../Utils/UtilsSubscriptions';
import UtilsMovies from '../../Utils/UtilsMovies';

const SubscribeToMovieComp = (props) => {
    const [moviesWatched, setMoviesWatched] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [objMoviesList, setObjMoviesList] = useState("");
    const [choosenOption, setChoosenOption] = useState("");
    const [date, setDate] = useState("");

    useEffect(async () => {
        var resp = await UtilsSubscriptions.getAllSubscriptions();

        var myMoviesWatched = resp.data.filter((member) => {
            if (member.memberId === props.id) {
                return member;
            }
        });

        if (myMoviesWatched.length > 0) {
            myMoviesWatched = myMoviesWatched[0].movies.map((movie) => movie.movieId);
            setMoviesWatched(myMoviesWatched);
        }

        var resp = await UtilsMovies.getAllMovies();
        var allMoviesData = resp.data.map((movie) => movie._id);
        setAllMovies(allMoviesData);
    }, []);

    useEffect(async () => {
        var moviesId = allMovies.filter(movie => {
            var movieToAdd = "";
            moviesWatched.forEach(movieWatched => {
                if (movieWatched === movie) {
                    movieToAdd = movie;
                }
            });

            if (movieToAdd === "") {
                return movie;
            }
        });

        var moviesNames = await Promise.all(moviesId.map(async (movieId) => {
            var resp = await UtilsMovies.getMovieById(movieId);

            return resp.data.name;
        }));

        var moviesList = [];

        for (var i = 0; i < moviesId.length; i++) {
            var obj = {
                id: moviesId[i],
                name: moviesNames[i]
            }

            moviesList.push(obj);
        }

        var obj = moviesList.map((movie, index) => {
            return (
                <option key={index} value={movie.id}>{movie.name}</option>
            );
        });

        setObjMoviesList(obj);
    }, [allMovies]);

    const getOption = (e) => {
        setChoosenOption(e.target.value);
    }

    const getDate = (e) => {
        setDate(new Date(e.target.value));
    }

    const subscribe = async () => {
        if (date !== "" && choosenOption !== "") {
            var resp = await UtilsSubscriptions.getAllSubscriptions();

            var myMoviesWatched = [];
            myMoviesWatched = resp.data.filter((member) => {
                if (member.memberId === props.id) {
                    return member;
                }
            });
            
            if (myMoviesWatched.length === 0) {
                var movieToAdd = {
                    memberId: props.id,
                    movies: [{
                        movieId: choosenOption,
                        date: date
                    }]
                };   
                myMoviesWatched.push(movieToAdd);               
                await UtilsSubscriptions.addSubscription(myMoviesWatched[0]);   

                props.closeSubscribeToMovieComp();
            }
            else {
                var movieToAdd = {
                    movieId: choosenOption,
                    date: date
                }
    
                myMoviesWatched[0].movies.push(movieToAdd);                
                await UtilsSubscriptions.updateSubscription(myMoviesWatched[0]._id ,myMoviesWatched[0]);

                props.closeSubscribeToMovieComp();
            }
        }
        else {
            alert("Can't add subscription\nPlease add all data needed");
        }
    }

    return (
        <div className="divBorderAddSubscribe">
            <br />
            Add a new movie
            <br />
            <select onChange={getOption}>
                <option value="">choose movie</option>
                {objMoviesList}
            </select>
            &nbsp;
            <input type="Date" onChange={getDate} />
            <br />
            <input type="button" value="Subscribe" onClick={subscribe} />
            <br /><br />
        </div>
    );
}

export default SubscribeToMovieComp;