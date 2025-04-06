import axios from "axios";

const ApiKey = "41174b29f1c31143c31f5283b534e5b2";
const Path = "https://api.themoviedb.org/3";

export type TGetMoviesResults = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: [];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export interface IGetMovies {
    dates: {
        maximum: string;
        minimum: string;
    }
    page: number;
    results: TGetMoviesResults[];
    total_pages: number;
    total_results: number;
}

export const getMovies = async () => {

    try {

        const res = await axios.get(`${Path}/movie/now_playing?api_key=${ApiKey}&language=ko`);
        const data = res.data;
        
        return data;

    } catch (error) {

        console.error(error);
    }
}