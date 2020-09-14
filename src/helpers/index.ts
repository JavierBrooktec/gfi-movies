export const  addToFav = (id:string) => {
    const previousData = window.localStorage.getItem("favourites");

    if (previousData) {

        const newDataSet: Set<string> = new Set([...JSON.parse(previousData), id]);


        window.localStorage.setItem('favourites', JSON.stringify([...newDataSet]));

    } else {
        window.localStorage.setItem('favourites', JSON.stringify([id]));
    }



}

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


