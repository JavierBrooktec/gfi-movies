export type filmType = {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string,
    Type: string,
};


export type response = {
    Response: string,
    Search: filmType[],
    totalResults: number,
};
