export function getRandomFilm(films: string[]):string {
    const rand = Math.floor(Math.random() * films.length);

    return films[rand];

}


