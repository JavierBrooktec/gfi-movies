import React, { useEffect, useState } from 'react'

import NavBar from '../../components/Navbar';
import FilmsLayout from '../../components/FilmsLayout';

import { filmType, response } from '../../types';

import {addToFav, removeFromFav} from '../../helpers'

const Favourites = () => {

    const [films, setFilms]: any[] = useState([]);
    const [search, setSearch] = useState('');

    async function getFavouriteMovie(id: string): Promise<response> {
        const { REACT_APP_API_KEY } = process.env;
        let response = await fetch(`http://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&i=${id}`);
        let data = await response.json();
        if (data.Response !== 'True') {
            throw new Error(data.Error);
        }
        return data;
    }
    

    const callback = (type:string, id:string) => {

        switch (type) {
            case 'add':
                callBackAddtoFav(id);
                break;
            case 'remove':
                callBackRemoveFromFav(id);
                break;
            default:
                break;
        }
    }

    const callBackAddtoFav = (id:string) => {
        addToFav(id);
        // const newFilm = getFavouriteMovie(id);
        // newFilm.then((f) => [...films, f]).catch(console.warn);
    }

    const callBackRemoveFromFav = (id:string) => {
        console.log('holaa');
        removeFromFav(id);
        const newFilms = films.filter((film:filmType) => film.imdbID !== id);
        setFilms(newFilms);
    }

    useEffect(() => {
        const previousData = window.localStorage.getItem("favourites");

        if (previousData) {
            const data: string[] = JSON.parse(previousData);

            const filmsArr = Promise.all(data.map((id) => getFavouriteMovie(id)));

            filmsArr.then(setFilms).catch(console.warn);
        }
    }, [])



    return (
        <div className="Favourites Has-NavBar-container" >
            <NavBar search={setSearch} />
            <FilmsLayout films={films} search={search} remove={true} callback={callback}  />

        </div>
    )
}

export default Favourites;