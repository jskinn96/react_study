import { useState, useEffect } from "react";
import LoadingEl from "../components/loadingStudy";
import Movie from "../components/movieStudy";

function Home() {

    const [loading, loadingFunc]    = useState(true);
    const [movies, getMoviesFunc]   = useState([]);

    const getMoviesFn = async () => {

        try {

            const moviesFullData = await (
                await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year')
            ).json();
            const moviesData     = moviesFullData.data.movies;

            getMoviesFunc(moviesData);
            loadingFunc(false);

        } catch(error) {

            console.error(error);
        }

    }

    useEffect(() => {

        getMoviesFn();
    }, []);

    return (
        <div
        style={{
            display : "grid",
            gridTemplateColumns : "1fr 1fr 1fr",
            gap : "10px",
            padding : "20px"
        }}
        >
            {
                loading
                ? <LoadingEl />
                : (
                    movies.map((item) => {

                        const itmId     = item.id;
                        const imgSrc    = item.medium_cover_image;
                        const title     = item.title;
                        const rating    = item.rating;
                        const lang      = item.language
                                        ? item.language
                                        : '?';
                        const summary   = item.summary;
                        const genres    = item.genres;

                        return (
                            <Movie 
                            key={itmId} 
                            idx={itmId} 
                            imgSrc={imgSrc} 
                            title={title} 
                            rating={rating} 
                            lang={lang} 
                            summary={summary}
                            genres={genres}
                            />
                        );
                    })    
                )
            }
        </div>
    );
}

export default Home; 