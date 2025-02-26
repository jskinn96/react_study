import { useState, useEffect } from "react";

const LoadingEl = () => {

    return (<strong>Loding......</strong>);
}

function App() {

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
        <div>
            {
                loading
                ? <LoadingEl />
                : (
                    <div>
                        {
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
                                    <div key={itmId}>
                                        <img src={imgSrc} />
                                        <h1>
                                            {title}
                                            <span
                                            style={{
                                                marginLeft : '10px',
                                                fontSize : '20px',
                                            }}
                                            >({lang}) (⭐{rating})</span>
                                        </h1>
                                        {
                                            summary && <h2>{summary}</h2>
                                        }
                                        {
                                            genres.length > 0 && (
                                                <ul>
                                                    {
                                                        genres.map((genre) => 
                                                            <li 
                                                            key={genre}
                                                            style={{
                                                                fontWeight : 'bold'
                                                            }}
                                                            >{genre}</li>
                                                        )
                                                    }
                                                </ul>
                                            )
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}

export default App; 