import React, { useState, useEffect } from 'react';
import UtilsMovies from '../../Utils/UtilsMovies';
import UtilsSubscriptions from '../../Utils/UtilsSubscriptions';
import SubscribeToMovieComp from './SubscribeToMovieComp';
import { UserConsumer } from '../UserContext';

const MoviesWatchedComp = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [objAddMovie, setObjAddMovie] = useState("");
    const [moviesWatched, setMoviesWatched] = useState([]);
    const [moviesWatchedList, setMoviesWatchedList] = useState("");    

    useEffect(async () => {
        var resp = await UtilsSubscriptions.getAllSubscriptions();

        var myMoviesWatched = resp.data.filter((member) => {
            if (member.memberId === props.id) {
                return member;
            }
        });

        if (myMoviesWatched.length > 0) {
            myMoviesWatched = await Promise.all(myMoviesWatched[0].movies.map(async (movie) => {
                var movieName = await UtilsMovies.getMovieById(movie.movieId);
                movieName = movieName.data.name;
                var obj = {
                    movieId: movie.movieId,
                    date: movie.date,
                    name: movieName
                };

                return obj;
            }));            
            setMoviesWatched(myMoviesWatched);
        }
    }, []);


    useEffect(() => {
        var obj = moviesWatched.map((movie, index) => {
            return (
                <li key={index}>
                    <span className="spanLink" onClick={goToMoviePage}>{movie.name}</span>, {new Date(movie.date).toLocaleDateString()}
                </li>
            );
        });
        setMoviesWatchedList(obj);        
    }, [moviesWatched]);

    useEffect(() => {
        if (!isOpen) {
            setObjAddMovie("");
        }
        else {
            setObjAddMovie(<SubscribeToMovieComp closeSubscribeToMovieComp={closeSubscribeToMovieComp} id={props.id} />)
        }
    }, [isOpen]);

    const openSubscribeToMovieComp = () => {
        setIsOpen(!isOpen);
    }

    const closeSubscribeToMovieComp = async () => {        
        setIsOpen(false);
        var resp = await UtilsSubscriptions.getAllSubscriptions();

        var myMoviesWatched = resp.data.filter((member) => {
            if (member.memberId === props.id) {
                return member;
            }
        });

        if (myMoviesWatched.length > 0) {
            myMoviesWatched = await Promise.all(myMoviesWatched[0].movies.map(async (movie) => {
                var movieName = await UtilsMovies.getMovieById(movie.movieId);
                movieName = movieName.data.name;
                var obj = {
                    movieId: movie.movieId,
                    date: movie.date,
                    name: movieName
                };

                return obj;
            }));           
            setMoviesWatched(myMoviesWatched);
        }
    }

    const goToMoviePage = (e) => {                  
        props.goToMovies(e.target.innerHTML);
    }

    return (
        <div className="divBorderMoviesWatched">
            <b>Movies Watched</b><br />
            <input type="button" value="Subscribe to new  movie" onClick={openSubscribeToMovieComp} />
            {objAddMovie}
            <br />
            <ul>
                {moviesWatchedList}
            </ul>
        </div>
    );
}

export default MoviesWatchedComp;