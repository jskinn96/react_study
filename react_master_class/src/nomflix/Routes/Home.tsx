import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMovies } from "../Api/MovieApi";
import styled from "styled-components";
import { makeImagePath } from "../Utils/Utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const Slider = styled.div`
    position: relative;
    top: -100px;
    width: 100%;
`;

const Row = styled(motion.div)`
    position: absolute;
    width: 100%;
    padding: 0 60px;
    white-space: nowrap;
    left: calc(-16.66666667% + 20px); 
`;

const Box = styled(motion.div)`
    display: inline-block;
    width: 16.66666667%;
    padding: 0 .2vw;
    &:nth-of-type(2) .SlideCont {transform-origin: center left;}
    &:nth-of-type(7) .SlideCont {transform-origin: center right;}
`;

const BoxCont = styled(motion.div) <{ $bgPhoto: string }>`
    border-radius: 4px;
    font-size: 66px;
    padding: 28.125% 0;
    background-image: url(${(props) => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    cursor: pointer;
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${({ theme }) => theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
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
    position: absolute;
    width: 40vw;
    height: 80vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 400px;
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

const rowVariants = {
    hidden: (custom: number) => ({ x: custom }),
    visible: { x: 0 },
    exit: (custom: number) => ({ x: -custom }),
};

const BoxContVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -60,
        transition: {
            delay: .5,
            duration: .1,
            type: "tween"
        }
    }
}

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
        },
    },
};

const Home = () => {

    const { data, isLoading } = useQuery<IGetMovies>({
        queryKey: ["movies", "nowPlaying"],
        queryFn: getMovies,
    });

    const offset = 6;

    const precomputedSlides = useMemo(() => {

        if (!data || !data.results) return [];

        const slides = [];
        const tmpData = data.results.slice(1);
        const totalMovies = tmpData.length;
        const maxIndex = Math.floor(totalMovies / offset);

        for (let i = 0; i <= maxIndex; i++) {

            const targetIdx = offset * i;
            const startIdx = targetIdx - 1;
            const endIdx = targetIdx + offset + 1;

            let currentSlide = tmpData.slice(startIdx, endIdx);
            if (i === maxIndex) {

                const remain = offset - currentSlide.length;
                if (remain > 0) {

                    const fallback = tmpData.slice(tmpData.length - offset - 1);
                    currentSlide = [...fallback, tmpData[0]];
                }
            } else if (i === 0) {

                const startData = tmpData.slice(0, offset);
                currentSlide = [tmpData[tmpData.length - 1], ...startData, tmpData[offset]];
            }

            slides.push(currentSlide);
        }

        return slides;
    }, [data]);

    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    const rowRef = useRef<HTMLDivElement>(null);
    const [slideDistance, setSlideDistance] = useState(0);
    const [movieIdParams] = useSearchParams();
    const movieId = movieIdParams.get("movieId");
    const movieNavi = useNavigate();
    const { scrollY } = useScroll();
    const [y, setY] = useState(0);

    const onMovieInfoModal = (movieId: number) => {

        movieNavi(`/?movieId=${movieId}`);
    };

    const onOverlayClick = () => movieNavi("/");

    useMotionValueEvent(scrollY, "change", (latest) => {

        setY(latest);
    });

    const clickedMovie = movieId && data?.results.find(movie => movie.id === +movieId);

    const normalDistance = () => {

        if (rowRef.current?.clientWidth) {

            const rowWidth = rowRef.current?.clientWidth;
            const boxWidth = (rowWidth - 120) * 16.66666667 / 100;
            const distance = boxWidth * 8;

            return distance;
        }

        return 0;
    }

    useEffect(() => {

        if (rowRef.current?.clientWidth) {

            const dist = normalDistance();
            setSlideDistance(dist);
        }

    }, [rowRef.current?.clientWidth]);

    const increaseIndex = () => {

        if (data) {

            if (leaving) return;

            const totalMovies = data.results.length - 1;
            const maxMIdx = Math.floor(totalMovies / offset);

            const currentIdx = index === maxMIdx ? 0 : index + 1;
            setIndex(currentIdx);

            if (currentIdx === maxMIdx) {

                const dist = normalDistance();
                setSlideDistance(dist);
            }

            setLeaving(true);

            if (isFirst === true) setIsFirst(false);
        }
    }

    return (
        <Wrapper>
            {
                isLoading
                    ? <Loader>Loading...</Loader>
                    : (
                        <>
                            <Banner
                                onClick={increaseIndex}
                                $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                            >
                                <Title>{data?.results[0].title}</Title>
                                <Overview>{data?.results[0].overview}</Overview>
                            </Banner>
                            <Slider>
                                <AnimatePresence
                                    initial={false}
                                    onExitComplete={() => setLeaving(false)}
                                >
                                    <Row
                                        variants={rowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ type: "tween", duration: 1, ease: "easeInOut" }}
                                        custom={slideDistance}
                                        ref={rowRef}
                                        key={index}
                                        // layout
                                    >
                                        {
                                            precomputedSlides[index].map((movie, idx) => (
                                                <Box
                                                    key={movie.id}
                                                >
                                                    {
                                                        isFirst && idx === 0
                                                            ? ""
                                                            : <BoxCont
                                                                layoutId={movie.id + ""}
                                                                $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                                                whileHover="hover"
                                                                initial="normal"
                                                                transition={{ type: "tween" }}
                                                                variants={BoxContVariants}
                                                                className="SlideCont"
                                                                onClick={() => onMovieInfoModal(movie.id)}
                                                            >
                                                                <Info variants={infoVariants}>
                                                                    <h4>{movie.title}</h4>
                                                                </Info>
                                                            </BoxCont>
                                                    }
                                                </Box>
                                            ))
                                        }
                                    </Row>
                                </AnimatePresence>
                            </Slider>
                            <AnimatePresence>
                                {movieId ? (
                                    <>
                                        <Overlay
                                            onClick={onOverlayClick}
                                            exit={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        />
                                        <BigMovie
                                            style={{ top: y + 100 }}
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