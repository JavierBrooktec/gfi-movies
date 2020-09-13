import React, { useEffect, useState } from 'react'

import NavBar from '../../components/Navbar';

import { getRandomFilm } from '../../helpers/getRandomFilm';

import './Home.scss';

export type filmType = {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string,
    Type: string,
};







const Movies = () => {



    const randomFilms = ['ring', 'car', 'high', 'american', 'star', 'super', 'cry', 'happy', 'sun', 'moon'];

    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState(getRandomFilm(randomFilms));





    useEffect(() => {

        const { REACT_APP_API_KEY } = process.env;


        async function getMovies(title: string): Promise<any> {
            let response = await fetch(`http://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&type=movie&s=${title}`);
            let data = await response.json();
            if (data.Response !== 'True') {
                console.log(data);
                throw new Error(data.Error);
            }
            console.log(data);

            return data;
        }


        getMovies(search)
            .then(({ Search }) => setFilms(Search)).catch((e) => { console.warn(e); setFilms([]) });
    }, [search]);



    const filmsCards = films.length ?
        films.map((f: filmType) => <h1 key={`film-${f.imdbID}`}>{f.Title}</h1>) :
        <h1>Sorry we found no matches </h1>;

    return (
        <div className="Home">
            <NavBar search={setSearch} />
            <div className="FilmCards-Container">
                {
                    filmsCards
                }
            </div>


        </div>
    )
}

export default Movies
