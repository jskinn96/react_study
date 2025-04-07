import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMovies, TGetMoviesResults } from "../Api/MovieApi";
import styled from "styled-components";
import { makeImagePath } from "../Utils/Utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

const Slider = styled.div`
    position: relative;
    top: -100px;
    width: 100%;
`;

const Row = styled(motion.div)`
    display: flex;
    position: absolute;
    width: calc(100% + 400px);
    overflow: hidden;
    left: -200px;
`;

const Box = styled(motion.div)`
    width: 16.66666667%;
    padding: 0 .2vw;
`;

const BoxCont = styled.div<{ $bgPhoto: string }>`
    border-radius: 4px;
    font-size: 66px;
    padding: 28.125% 0;
    background-image: url(${(props) => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
`;

const rowVariants = {
    hidden: (custom: number) => ({ x: custom }),
    visible: { x: 0 },
    exit: (custom: number) => ({ x: -custom }),
};


const Home = () => {

    const { data, isLoading } = useQuery<IGetMovies>({
        queryKey: ["movies", "nowPlaying"],
        queryFn: getMovies,
    });

    const offset = 6;
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [movieArr, setMovieArr] = useState<TGetMoviesResults[]>([]);
    const [isFirst, setIsFirst] = useState(true);
    const rowRef = useRef<HTMLDivElement>(null);
    const [slideDistance, setSlideDistance] = useState(0);

    const normalDistance = () => {

        if (rowRef.current?.clientWidth) {

            const rowWidth = rowRef.current?.clientWidth;
            const boxWidth = rowWidth * 16.66666667 / 100;
            const distance = rowWidth - (boxWidth + (boxWidth / 2));

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

    useEffect(() => {

        if (!isLoading && data?.results) setMovieArr(data?.results.slice(0, offset + 2));
        
    }, [isLoading]);

    const increaseIndex = () => {
        
        if (data) {

            if (leaving) return;

            const totalMovies = data.results.length - 1;
            const maxMIdx = Math.floor(totalMovies / offset);

            const currentIdx = index === maxMIdx ? 0 : index + 1;
            setIndex(currentIdx);

            const tmpData = data?.results.slice(1);

            const targetIdx = offset * currentIdx;
            const startIdx = targetIdx - 1;
            const endIdx = targetIdx + offset + 1;

            let currentData = tmpData.slice(startIdx, endIdx);
            if (currentIdx === maxMIdx) {

                const etcIdx = offset - currentData.length;
                if (etcIdx > 0) {

                    const dist = normalDistance();
                    setSlideDistance(dist);

                    const etcStartIdx = tmpData.length - offset - 1;
                    const etcData = tmpData.slice(etcStartIdx, tmpData.length);

                    currentData = [...etcData, tmpData[0]];
                }

            } else if (currentIdx === 0) {

                const startData = tmpData.slice(0, offset);
                currentData = [tmpData[tmpData.length - 1], ...startData, tmpData[offset]];
            }

            setMovieArr(currentData);

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
                                        transition={{ type: "tween", duration: 1 }}
                                        custom={slideDistance}
                                        ref={rowRef}
                                        key={index}
                                    >
                                        {
                                            movieArr.map((movie, idx) => (
                                                <Box
                                                    key={movie.id}
                                                    layoutId={movie.backdrop_path}
                                                >
                                                    {
                                                        isFirst && idx === 0
                                                            ? ""
                                                            : <BoxCont
                                                                $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                                            />
                                                    }
                                                </Box>
                                            ))
                                        }
                                    </Row>
                                </AnimatePresence>
                            </Slider>
                        </>
                    )
            }
        </Wrapper>
    );
}

export default Home;