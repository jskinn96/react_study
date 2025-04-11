import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMovies } from "../Api/MovieApi";
import styled from "styled-components";
import { makeImagePath } from "../Utils/Utils";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import Slides from "../Components/Slides";

const Wrapper = styled.div`
    background: black;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.$bgPhoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px; ;
`;

const Overview = styled.p`
    font-size: 1.2vw;
    width: 50%;
    letter-spacing: 1px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .45);
    line-height: normal;
    word-break: keep-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    opacity: 0;
`;

const BigMovie = styled(motion.div)`
    position: fixed;
    width: 50vw;
    height: 95vh;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    padding-top: 56.3925%;
`;

const BigTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    padding: 20px;
    font-size: 36px;
    font-weight: bold;
    position: relative;
    top: -80px;
`;

const BigOverview = styled.p`
    padding: 20px;
    position: relative;
    top: -80px;
    color: ${(props) => props.theme.white.lighter};
    line-height: normal;
`;

const Home = () => {

    const { data, isLoading } = useQuery<IGetMovies>({
        queryKey: ["movies", "nowPlaying"],
        queryFn: getMovies,
    });

    const movieNavi = useNavigate();
    const [movieIdParams] = useSearchParams();
    const movieId = movieIdParams.get("movieId");

    const onOverlayClick = () => movieNavi("/");

    const clickedMovie = movieId && data?.results.find(movie => movie.id === +movieId);

    return (
        <Wrapper>
            {
                isLoading
                    ? <Loader>Loading...</Loader>
                    : (
                        <>
                            <Banner
                                $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                            >
                                <Title>{data?.results[0].original_title}</Title>
                                <Overview>{data?.results[0].overview}</Overview>
                            </Banner>
                            {
                                data && <Slides
                                    data={data}
                                />
                            }
                            <AnimatePresence>
                                {movieId ? (
                                    <>
                                        <Overlay
                                            onClick={onOverlayClick}
                                            exit={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        />
                                        <BigMovie
                                            layoutId={movieId}
                                        >
                                            {clickedMovie && (
                                                <>
                                                    <BigCover
                                                        style={{
                                                            backgroundImage: `linear-gradient(0deg, #181818, transparent 50%), url(${makeImagePath(
                                                                clickedMovie.backdrop_path,
                                                                "w780"
                                                            )})`,
                                                        }}
                                                    />
                                                    <BigTitle>{clickedMovie.title}</BigTitle>
                                                    <BigOverview>{clickedMovie.overview}</BigOverview>
                                                </>
                                            )}
                                        </BigMovie>
                                    </>
                                ) : null}
                            </AnimatePresence>
                        </>
                    )
            }
        </Wrapper>
    );
}

export default Home;