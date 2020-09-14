import React from 'react'
import noPosterFound from '../../assets/no-poster.jpg'
import './FilmCard.scss';

type FilmCardProps = {
    title: string,
    year: string,
    poster: string
}

const FilmCard = ({ poster, title, year }: FilmCardProps) => {

    const posterSource = poster === 'N/A' ? noPosterFound : poster;

    return (
        // <div classNameName="FilmCard">
        //     <h3 classNameName="FilmCard-title">{title}</h3>
        //     <div className="FilmCard-content" style={{backgroundImage: `url(${posterSource})`}}>
        //         <p>year: {year}</p>
        //     </div>
        // </div>

        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={posterSource} alt={`poster-${title}`} className="flip-card-img" />
                </div>
                <div className="flip-card-back" style={{ backgroundImage: `url(${posterSource}), linear-gradient(90deg, rgba(48, 56, 73, 0.2) 0%, rgba(48, 56, 73, 0.2) 100%)` }}>
                    <div>
                        <h1 className="flip-card-title">{title}</h1>
                        <h3 className="flip-card-subtitle">year: {year}</h3>
                    </div>
                    <button className="button" type="button">Add to favourites</button>
                </div>
            </div>
        </div>

    )
}

export default FilmCard;