import React from 'react'
import noPosterFound from '../../assets/no-poster.jpg'
import './FilmCard.scss';

type FilmCardProps = {
    title: string,
    year: string,
    poster: string
}

const FilmCard = ({poster, title, year }: FilmCardProps) => {

    const posterSource = poster === 'N/A' ? noPosterFound : poster;

    return (
        <div className="FilmCard">
            <h3 className="FilmCard-title">{title}</h3>
            <div className="FilmCard-content" style={{backgroundImage: `url(${posterSource})`}}>
                <p>year: {year}</p>
            </div>
        </div>
    )
}

export default FilmCard;