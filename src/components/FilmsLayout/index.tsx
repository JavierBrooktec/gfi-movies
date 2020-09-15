import React from 'react'

import './FilmsLayout.scss';
import FilmCard from '../FilmCard';
import {filmType} from '../../types';

type FilmsLayoutProps = {
    films: filmType[],
    search?: string,
    add?: boolean,
    remove?: boolean
    callback?: any
}



const FilmsLayout = ({films, search = '',  add = false, remove = false, callback}:FilmsLayoutProps) => {





    let  allfilmsFiltered = films;

    
    if(search === ''){
       
    }else {
        allfilmsFiltered = films.filter((f) => f.Title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) );
    }

    const filmsCards = allfilmsFiltered.length ?
        allfilmsFiltered.map((f: filmType) =>
            <FilmCard key={`film-${f.imdbID}`} id={f.imdbID} year={f.Year} poster={f.Poster} title={f.Title} add={add} remove={remove} callback={callback}/>) :

            <h1 className="noResult">Type in the Search Bar to start, we found no matches</h1>;



    return (
        <div className="FilmsLayout">
        

        {
            filmsCards
        }
    </div>
    )

}

export default FilmsLayout;
