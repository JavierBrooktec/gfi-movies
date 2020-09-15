

import { responseType } from '../types';

export const addToFav = (id: string) => {

    const auth = fakeAuth();

    if (auth) {

        const userData: any = window.sessionStorage.getItem('user');
        const { name } = JSON.parse(userData);
        const previousData = window.localStorage.getItem(name);

        if (previousData) {
            const previousDataJson = JSON.parse(previousData);
            const { favourites } = previousDataJson
            const newDataSet: Set<string> = new Set([...favourites, id]);


            window.localStorage.setItem(name, JSON.stringify({ ...previousDataJson, favourites: [...newDataSet] }));
        }
    }
}


export const addlastSearch = (search: string) => {
    window.sessionStorage.setItem('lastSearch', search);
}
export const getlastSearch = () => window.sessionStorage.getItem("lastSearch");


export const removeFromFav = (id: string) => {
    const auth = fakeAuth();


    if (auth) {

        const userData: any = window.sessionStorage.getItem('user');
        const { name } = JSON.parse(userData);
        const previousData = window.localStorage.getItem(name);

        if (previousData) {
            const previousDataJson = JSON.parse(previousData);
            const { favourites } = previousDataJson
            let dataSet: Set<string> = new Set([...favourites, id]);
            dataSet.delete(id);
            window.localStorage.setItem(name, JSON.stringify({ ...previousDataJson, favourites: [...dataSet] }));
        }
    }

}

export function getRandomFilm(films: string[]): string {
    const rand = Math.floor(Math.random() * films.length);

    return films[rand];

}

export async function getMoviebyId(id: string): Promise<responseType> {
    const { REACT_APP_API_KEY } = process.env;
    let response = await fetch(`http://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&i=${id}`);
    let data = await response.json();
    if (data.Response !== 'True') {
        throw new Error(data.Error);
    }
    return data;
}

export const logIn = (name: string, password: string) => {
    window.sessionStorage.setItem('user', JSON.stringify({ name, password }));
    return fakeAuth();
}

export const logOut = () => {
    window.sessionStorage.removeItem('user');
}

export const signUp = (name: string, password: string) => {
    const previousData = window.localStorage.getItem(name);
    if (!previousData) {
        window.localStorage.setItem(name, JSON.stringify({ name, favourites: [], password }));
        window.sessionStorage.setItem('user', JSON.stringify({ name, password }));
        return [true, 'singed Up'];
    } else {
        return [false, 'You are alreafy singed Up'];
    }

}

export const fakeAuth = () => {


    const userData = window.sessionStorage.getItem('user');


    console.log('ejecutando el fake');

    if (userData) {
        const { name, password } = JSON.parse(userData);
        const data = window.localStorage.getItem(name);
        if (data) {
            if (password === JSON.parse(data).password) {
                return [true, 'logged'];
            } else {
                return [false, 'incorrect passsword'];
            }
        } else {
            return [false, 'username incorrect'];
        }
    } else {
        return [false, 'there was an error'];
    }

}




