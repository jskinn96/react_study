import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Movie from "../components/movieStudy";
import LoadingEl from "../components/loadingStudy";

function Detail() {

    const {idx}                         = useParams();
    const [movieData, getMovieDataFunc] = useState([]);
    const [loading, setLoading]         = useState(true);

    useEffect(() => {

        const getMovieData = async () => {
            
            try {
                
                const movieJsonData = await (
                    await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${idx}`)
                ).json();
                const movieJson     = movieJsonData.data.movie;
                
                getMovieDataFunc(movieJson);

            } catch(error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        }

        getMovieData();

    }, [idx]);

    if (loading) return <LoadingEl />;
    if (!movieData) return <div>No Data</div>;

    const {
        id,   
        medium_cover_image,
        title,
        rating,
        language,
        summary,
        genres,
    } = movieData;
    const lang = language || "?";

    return (
        <div>
            <Movie 
            idx={id} 
            imgSrc={medium_cover_image} 
            title={title} 
            rating={rating} 
            lang={lang} 
            summary={summary}
            genres={genres}
            />
        </div>
    )
}

export default Detail;