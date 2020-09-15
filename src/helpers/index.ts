

import { response } from '../types';

export const  addToFav = (id:string) => {
    const previousData = window.localStorage.getItem("favourites");

    if (previousData) {

        const newDataSet: Set<string> = new Set([...JSON.parse(previousData), id]);


        window.localStorage.setItem('favourites', JSON.stringify([...newDataSet]));

    } else {
        window.localStorage.setItem('favourites', JSON.stringify([id]));
    }



}


export const  addlastSearch = (search:string) => {
        window.sessionStorage.setItem('lastSearch', search);
}
export const  getlastSearch = () =>  window.sessionStorage.getItem("lastSearch");


export const removeFromFav = (id:string) => {
    const previousData = window.localStorage.getItem("favourites");

    if (previousData) {
        let dataSet: Set<string> = new Set([...JSON.parse(previousData)]);
        dataSet.delete(id);
        window.localStorage.setItem('favourites', JSON.stringify([...dataSet]));
    }
}

export function getRandomFilm(films: string[]):string {
    const rand = Math.floor(Math.random() * films.length);

    return films[rand];

}

export  async function getMoviebyId(id: string): Promise<response> {
    const { REACT_APP_API_KEY } = process.env;
    let response = await fetch(`http://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&i=${id}`);
    let data = await response.json();
    if (data.Response !== 'True') {
        throw new Error(data.Error);
    }
    return data;
}


