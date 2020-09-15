import React, { useEffect, useState } from 'react'

import NavBar from '../../components/Navbar';
import FilmsLayout from '../../components/FilmsLayout';

import { filmType } from '../../types';

import { addToFav, removeFromFav, getMoviebyId } from '../../helpers'

import './Favourites.scss';

const Favourites = () => {

    const [films, setFilms]: any[] = useState([]);
    const [search, setSearch] = useState('');
    const [notification, setNotification] = useState('');



    const callback = (type: string, id: string) => {

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


    const callBackAddtoFav = (id: string) => {
        addToFav(id);
        // const newFilm = getMoviebyId(id);
        // newFilm.then((f) => [...films, f]).catch(console.warn);
    }

    const callBackRemoveFromFav = (id: string) => {
        removeFromFav(id);
        const newFilms = films.filter((film: filmType) => film.imdbID !== id);
        setFilms(newFilms);
        setNotification('show');
    }

    useEffect(() => {
        if (notification === 'show') {
            setTimeout(() => {
                setNotification('hide');
                setTimeout(() => {
                    setNotification('');
                }, 600);
            }, 1000);
        }
    }, [notification]);



    useEffect(() => {

        const userData: any = window.sessionStorage.getItem('user');
        const { name } = JSON.parse(userData);
        const previousData = window.localStorage.getItem(name);

        if (previousData) {

            const previousDataJson = JSON.parse(previousData);
            const { favourites } = previousDataJson

            const filmsArr = Promise.all(favourites.map((id) => getMoviebyId(id)));

            filmsArr.then(setFilms).catch(console.warn);
        }
    }, [])



    return (
        <div className="Favourites Has-NavBar-container" >
            <div className="body-container">
                <NavBar search={setSearch} />
                <h1 className="Favourites-title">Your favourites <span aria-label="heart" role="img">♥️</span></h1>
                <FilmsLayout films={films} search={search} remove={true} callback={callback} />
            </div>
            <div className="notification-container" id="notification-container">
                <div className={`notification notification-warning ${notification}`}>
                    <strong>Success : </strong> removed from favourites.
	            </div>
            </div>
        </div>
    )
}

export default Favourites;