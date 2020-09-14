import React, { useEffect, useState } from 'react'

// import { getRandomFilm } from '../../helpers/getRandomFilm';


import NavBar from '../../components/Navbar';
import FilmCard from '../../components/FilmCard';
import {
    faFilm
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import './Home.scss';

export type filmType = {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string,
    Type: string,
};



export type response = {
    Response: string,
    Search: filmType[],
    totalResults: number,
};



const Movies = () => {

    const [films, setFilms]: any[] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [roll, setRoll] = useState(false);
    const [end, setEnd] = useState(false);


    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        if ((e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === e.currentTarget.clientHeight) {
            setPage(page + 1);
            if (!end) {
                setRoll(true);
            }
        }

    }

    async function getMovies(p = 1): Promise<response> {
        const { REACT_APP_API_KEY } = process.env;
        let response = await fetch(`http://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&type=movie&s=${search}&page=${p}`);
        let data = await response.json();
        if (data.Response !== 'True') {
            throw new Error(data.Error);
        }
        return data;
    }


    useEffect(() => {
        if (end === false) {
            getMovies(page)
                .then(({ Search, totalResults }) => {
                    if ((totalResults - (10 * page)) <= 0) {
                        setEnd(true);
                        setRoll(false);
                        return;
                    }

                    setFilms((f: filmType[]) => { return [...f, ...Search] });
                    setRoll(false);
                })
                .catch((e) => { console.warn(e); setRoll(false); });
        }
    }, [page]);

    useEffect(() => {
        setEnd(false);
        getMovies()
            .then(({ Search }) => { setFilms(Search); })
            .catch((e) => { console.warn(e); setFilms([]); });
        setRoll(false);
    }, [search]);





    const filmsCards = films.length ?
        films.map((f: filmType) =>
            <FilmCard key={`film-${f.imdbID}`} year={f.Year} poster={f.Poster} title={f.Title} />) :
        (search.length === 0 ?
            <h1 className="noResult">Type in the Search Bar to start</h1> :
            <h1 className="noResult">Sorry we found no matches </h1>
        );





    return (
        <div className="Home" onScroll={handleScroll}>
            <NavBar search={setSearch} />
            <div className="FilmCards-Container">
                {
                    filmsCards
                }
            </div>
            {roll &&
                <div className="roll">
                    <FontAwesomeIcon className="roll-icon shaking" icon={faFilm} />
                    <FontAwesomeIcon className="roll-icon shaking" icon={faFilm} />
                    <FontAwesomeIcon className="roll-icon shaking" icon={faFilm} />
                </div>}
        </div>
    )
}

export default Movies
