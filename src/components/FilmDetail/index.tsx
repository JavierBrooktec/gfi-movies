import React, { useRef, useState, useEffect } from 'react'
import noPosterFound from '../../assets/no-poster.jpg'

import useResize from '../../hooks/useResize';

import './FilmDetail.scss';
import {
    useHistory
} from 'react-router-dom'

export type FilmDetailProps = {
    imdbID: string,
    Title: string,
    Poster: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Plot: string,
    Director: string,
    imdbRating: string,
    Production: string,
    Type: string,
    add?: boolean,
    remove?: boolean,
    callback?: any

}

const FilmDetail = ({
    imdbID,
    Poster,
    Title,
    Year,
    Rated,
    Runtime,
    Released,
    Genre,
    Plot,
    Director,
    imdbRating,
    Production,
    Type,
    add = false,
    remove = false,
    callback
}: FilmDetailProps) => {

    const ref = useRef<HTMLImageElement>(null);
    useResize(ref);

    const [newWidth, setNewWidth] = useState(0);

    const posterSource = Poster === 'N/A' ? noPosterFound : Poster;

    const handleCallback = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        callback(e.currentTarget.name, imdbID);
    }


    useEffect(() => {
        setNewWidth(ref.current ? ref.current.offsetWidth : 0);
    }, []);

    useEffect(() => {
        setNewWidth(ref.current ? ref.current.offsetWidth : 0);
    }, [ref.current]);


    const handleLoad = (e) => {
        setNewWidth(e.target.offsetWidth);
    }

    return (

        <div className="filmDetail-card">
            <div className="movie-img-container">
                <img ref={ref} className="movie-img" src={posterSource} alt={`poster-${Title}`} onLoad={handleLoad} />
            </div>
            <div className="movie-content" style={{ maxWidth: `${newWidth}px` }}>
                <h1 className="filmDetail-title">{Title}</h1>
                <ul className="filmDetail-stats">
                    <li>{Rated}  /</li>
                    <li>{Runtime}  /</li>
                    <li>{Genre}</li>
                </ul>
                <h5>SUMMARY</h5>
                <p>
                    {Plot}
                </p>
                <div className="buttons-container">
                    <button name="add" className="button" type="button" onClick={handleCallback}>Add to fav</button>
                    <button name="remove" className="button" type="button"  onClick={handleCallback}>remove from fav</button>
                </div>


            </div>

        </div>

    )
}

export default FilmDetail;