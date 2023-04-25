import React, { useState, useEffect } from 'react';
import UtilsMovies from '../../Utils/UtilsMovies';
import MovieComp from './MovieComp';

const AllMoviesComp = (props) => {
    const [movies, setMovies] = useState([]);
    const [findMoviesArr, setFindMoviesArr] = useState([]);
    const [find, setFind] = useState("");
    const [movieComp, setMovieComp] = useState("");
    const [moviesList, setMoviesList] = useState("");
    const [filterIsWorking, setFilterIsWorking] = useState(false);

    useEffect(async () => {
        var resp = await UtilsMovies.getAllMovies();
        setMovies(resp.data);
        var obj;

        if (props.movieName === "") {
            obj = movies.map((item, index) => {                
                return (
                    <div key={item._id}>
                        <MovieComp data={item} movieIsDeleted={movieIsDeleted} goToMembers={props.goToMembers}/><br />
                    </div>
                );
            });
        }
        else {
            obj = movies.filter((item) => {                
                if (item.name === props.movieName) {
                    return item;   
                }                
            }); 

            obj = obj.map((item, index) => {
                return (
                    <div key={item._id}>
                        <MovieComp data={item} movieIsDeleted={movieIsDeleted} goToMembers={props.goToMembers}/><br />
                    </div>
                );
            });
        }
    
        setMoviesList(obj);
    }, []);

    useEffect(() => {
        var obj;
        if (props.movieName === "") {
            if (filterIsWorking) {
                obj = findMoviesArr.map((item, index) => {
                    return (
                        <div key={item._id}>
                            <MovieComp data={item} movieIsDeleted={movieIsDeleted} goToMembers={props.goToMembers}/><br />
                        </div>
                    );
                });
            }
            else {
                obj = movies.map((item, index) => {
                    return (
                        <div key={item._id}>
                            <MovieComp data={item} movieIsDeleted={movieIsDeleted} goToMembers={props.goToMembers}/><br />
                        </div>
                    );
                });
            }
        }
        else {
            if (!filterIsWorking) {
                obj = movies.filter((item) => {                
                    if (item.name === props.movieName) {
                        return item;   
                    }                
                }); 
    
                obj = obj.map((item, index) => {
                    return (
                        <div key={item._id}>
                            <MovieComp data={item} movieIsDeleted={movieIsDeleted} goToMembers={props.goToMembers}/><br />
                        </div>
                    );
                });
            }         
        }
        setMovieComp(obj);
    
        if (moviesList.length > 0) {            
            setMovieComp("");
        }
    }, [moviesList, movies]);

    useEffect(async () => {        
        var obj = findMoviesArr.map((item, index) => {
            return (
                <div key={item._id}>
                    <MovieComp data={item} movieIsDeleted={movieIsDeleted} goToMembers={props.goToMembers}/><br />
                </div>
            );
        });

        setMoviesList(obj);
    }, [findMoviesArr]);

    const movieIsDeleted = async () => {
        var resp = await UtilsMovies.getAllMovies();
        setMovies(resp.data);
    }

    const getFind = (e) => {
        setFind(e.target.value);
    }

    const findMovie = () => {
        var filteredMovies = movies.filter(movie => {
            if (movie.name.toLowerCase().includes(find.toLowerCase())) {               
                return movie;                
            }            
        });

        if (find === "") {
            setFindMoviesArr(movies);
            setFilterIsWorking(false);
        }
        else {
            setFilterIsWorking(true);
            if (filteredMovies.length === 0) {
                setFindMoviesArr([]);
            }
            else {
                setFindMoviesArr(filteredMovies);
            }
            
        }
    }

    return (
        <div align="center">
            Find Movie: <input type="text" onChange={getFind} />
            &nbsp;
            <input type="button" value="Find" onClick={findMovie} />
            <br /><br />   
            {movieComp}         
            {moviesList}
        </div>
    );
}

export default AllMoviesComp;