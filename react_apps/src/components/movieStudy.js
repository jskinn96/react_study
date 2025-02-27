import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({imgSrc, title, rating, lang, summary, genres}) {

    return (
    <div>
        <img src={imgSrc} />
        <Link
        to="/movie">
            <h1>
                {title}
                <span
                style={{
                    marginLeft : '10px',
                    fontSize : '20px',
                }}
                >({lang}) (⭐{rating})</span>
            </h1>
        </Link>
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
}

Movie.propTypes = {
    imgSrc  : PropTypes.string.isRequired,
    title   : PropTypes.string.isRequired,
    rating  : PropTypes.string.isRequired,
    lang    : PropTypes.string,
    summary : PropTypes.string,
    genres  : PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;