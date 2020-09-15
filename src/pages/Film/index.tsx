import React, { useEffect, useState } from 'react'

import {
    useParams
} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilm
} from '@fortawesome/free-solid-svg-icons';

import { addToFav, removeFromFav, getMoviebyId } from '../../helpers'

import FilmDetail from '../../components/FilmDetail';
import NavBar from '../../components/Navbar';




const Film = () => {

    let { id } = useParams();


    const [film, setFilm]: any[] = useState(null);
    const [loading, setLoading]: any[] = useState(true);
    const [error, setError]: any[] = useState(false);
    const [notification, setNotification] = useState('');
    const [isAdd, setIsAdd] = useState(true);



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
        setIsAdd(true);
        setNotification('show');
        // const newFilm = getMoviebyId(id);
        // newFilm.then((f) => [...films, f]).catch(console.warn);
    }

    const callBackRemoveFromFav = (id: string) => {
        removeFromFav(id);
        setIsAdd(false);
        setNotification('show');

    }



    

    useEffect(() => {
        const filmData = getMoviebyId(id);
        filmData.then((f) => { setFilm(f); setLoading(false) }).catch((e) => { console.warn(e); setError(true) });
    }, [])


    useEffect(() => {
        if(notification === 'show'){
            setTimeout(() => {
                setNotification('hide');
                setTimeout(() => {
                    setNotification('');
                }, 600);
            }, 1000);
            
        }
    }, [notification]);


    const content = loading ?
        <div className="roll">
            <FontAwesomeIcon className="roll-icon shaking" icon={faFilm} />
            <FontAwesomeIcon className="roll-icon shaking" icon={faFilm} />
            <FontAwesomeIcon className="roll-icon shaking" icon={faFilm} />
        </div> : <FilmDetail {...film} callback={callback}/>;


    const body = error ? <h1>Sorry we dont have data for that id</h1> : content;
    return (
        <div className="Favourites Has-NavBar-container" >
            <div className="body-container">
                <NavBar showSearch={false} />
                {body}
            </div>
            <div className="notification-container" id="notification-container">

                <div className={`notification notification-${isAdd ? 'success' : 'warning' } ${notification}`}>
                    <strong>Success : </strong> {isAdd ? 'added to favourites' : 'removed from favouites'}
	            </div>
            </div>

        </div>
    )
}

export default Film;