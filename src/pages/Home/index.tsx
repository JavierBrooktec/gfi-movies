import React, { useEffect, useState, useContext } from 'react';



import NavBar from '../../components/Navbar';
import FilmsLayout from '../../components/FilmsLayout';
import { LogedContext } from '../../App';

import { addToFav } from '../../helpers'


import {
    faFilm
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filmType, responseType } from '../../types';



import './Home.scss';






const Movies = () => {

    const [films, setFilms]: any[] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [roll, setRoll] = useState(false);
    const [end, setEnd] = useState(false);

    const [notification, setNotification] = useState('');


    const callback = (type: string, id: string) => {
        addToFav(id);
        setNotification('show');
    }




    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        if ((e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === e.currentTarget.clientHeight) {
            setPage(page + 1);
            if (!end) {
                setRoll(true);
            }
        }

    }

    async function getMovies(p = 1): Promise<responseType> {
        const { REACT_APP_API_KEY } = process.env;
        let response = await fetch(`http://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&type=movie&s=${search}&page=${p}`);
        let data = await response.json();
        if (data.Response !== 'True') {
            throw new Error(data.Error);
        }
        return data;
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

    const { logged } = useContext(LogedContext);


    return (
        <div className="Home Has-NavBar-container" onScroll={handleScroll}>
            <NavBar search={setSearch} lengthSearch={3} />
            <div className="body-container">
                <FilmsLayout films={films} add={logged} callback={callback} />
                {roll &&
                    <div className="roll">
                        <FontAwesomeIcon className="roll-icon shaking" icon={faFilm} />
                        <FontAwesomeIcon className="roll-icon shaking" icon={faFilm} />
                        <FontAwesomeIcon className="roll-icon shaking" icon={faFilm} />
                    </div>}
            </div>
            <div className="notification-container" id="notification-container">

                <div className={`notification notification-success ${notification}`}>
                    <strong>Success : </strong> added to favourites.
	            </div>
            </div>
        </div>
    )
}

export default Movies
