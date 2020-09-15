import React from 'react'
import noPosterFound from '../../assets/no-poster.jpg'
import './FilmCard.scss';
import {
    useHistory
} from 'react-router-dom'

export type FilmCardProps = {
    id: string,
    title: string,
    year: string,
    poster: string,
    add?: boolean,
    remove?: boolean,
    callback?: any

}

const FilmCard = ({ id, poster, title, year, add = false, remove = false, callback }: FilmCardProps) => {

    const history = useHistory();

    const posterSource = poster === 'N/A' ? noPosterFound : poster;

    const handleCallback = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        callback(e.currentTarget.name, id);
        e.stopPropagation();
    }

    const redirectToFilm = () => {
        history.push(`/film/${id}`);
    }

    return (
        <div className="flip-card" onClick={redirectToFilm}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={posterSource} alt={`poster-${title}`} className="flip-card-img" />
                </div>
                <div className="flip-card-back" style={{ backgroundImage: `url(${posterSource}), linear-gradient(90deg, rgba(48, 56, 73, 0.2) 0%, rgba(48, 56, 73, 0.2) 100%)` }}>
                    <div className="flip-card-content">
                        <h1 className="flip-card-title">{title}</h1>
                        <h3 className="flip-card-subtitle">year: {year}</h3>
                    </div>
                    {add && <button name="add" className="button" type="button" onClick={handleCallback} >Add to fav</button>}
                    {remove && <button name="remove" className="button" type="button" onClick={handleCallback} >remove from fav</button>}
                </div>
            </div>
        </div>

    )
}

export default FilmCard;