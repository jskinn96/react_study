import { useQuery } from "@tanstack/react-query";
import { getCredits, getDetailMovies, getMovies, getPopular, getTopRated, getUpcoming, IGetCredits, IGetDetailMovies, IGetMovies } from "../Api/MovieApi";
import styled from "styled-components";
import { makeImagePath } from "../Utils/Utils";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import Slides, { SlidesHandle } from "../Components/Slides";
import { Info, Play, Star, X } from "lucide-react";
import typeTranslateObjConsole from "../../utils/typeTranslateConsole";
import { useRef } from "react";

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

const SlidesWrap = styled.div`
    position: relative;
    width: 100%;
    top: -100px;
`;

const SlidesText = styled.p`
    font-size: 1.625rem;
    padding-left: 60px;
    margin-bottom: 1rem;
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
    background-color: ${(props) => props.theme.black.darker};
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

const ModalContentWrap = styled.div`
    padding: 20px;
    position: relative;
    top: -80px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MovieInfoWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.25rem;
`;

const MovieYear = styled.span`
    color: #bcbcbc;
`;

const MovieRates = styled.span`
    display: flex;
    align-items: center;
    gap: 5px;
    svg {
        color: rgb(252 213 63);
    }
`;

const ModalContentLine = styled.div`
    display: flex;
    gap: 20px;
`;

const BigOverview = styled.div`
    color: ${(props) => props.theme.white.lighter};
    line-height: normal;
    flex: 0 0 60%;
`;

const MovieAttendeesLine = styled.div`
    line-height: normal;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const MovieAttendees = styled.div`
`;

const MovieAttendeesTitle = styled.span`
    color: #777;
    margin-right: 3px;
`;

const ModalCloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background-color: rgba(0, 0, 0, 0.75);
    border: none;
    border-radius: 9999px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.9);
    }

    svg {
        color: white;
        width: 20px;
        height: 20px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 10px;

    svg {
        width: 1.8rem;
        height: 1.8rem;
    }
`;

const BaseButton = styled.button`
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 1.25rem;
    border: none;
    border-radius: 4px;
    padding: .6rem 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
`;

const PlayButton = styled(BaseButton)`
    background-color: white;
    color: black;

    svg {
        fill: black;
        margin-right: 0.5rem;
    }

    &:hover {
        background-color: #e5e5e5;
    }
`;

const InfoButton = styled(BaseButton)`
    background-color: rgba(109, 109, 110, 0.7);
    color: white;

    svg {
        margin-right: 0.5rem;
    }

    &:hover {
        background-color: rgba(109, 109, 110, 0.4);
    }
`;

const Home = () => {

    //todo 데이터 마다 아이디가 겹치므로 레이아웃 아이디 출력 시, 문제가 발생한다...고유 아이디를 사용할 수 있게 수정 필요
    const { data, isLoading } = useQuery<IGetMovies>({
        queryKey: ["movies", "nowPlaying"],
        queryFn: getMovies,
    });

    const { data: topRatedData, isLoading: isLoadingTopRated } = useQuery<IGetMovies>({
        queryKey: ["movies", "topRated"],
        queryFn: getTopRated,
    });

    const { data: popularData, isLoading: isLoadingPopular } = useQuery<IGetMovies>({
        queryKey: ["movies", "popular"],
        queryFn: getPopular,
    });

    const { data: upcomingData, isLoading: isLoadingUpcoming } = useQuery<IGetMovies>({
        queryKey: ["movies", "upcoming"],
        queryFn: getUpcoming,
    });

    const movieNavi = useNavigate();
    const [movieIdParams] = useSearchParams();
    const movieId = Number(movieIdParams.get("movieId"));
    const slidesModalRef = useRef<SlidesHandle>(null);

    const onOverlayClick = () => movieNavi("/");

    const dfModalData = movieId && data?.results.find(el => el.id === movieId);

    const { data: modalData } = useQuery<IGetDetailMovies>({
        queryKey: ["movies", "detail"],
        queryFn: () => getDetailMovies(movieId),
        enabled: !!movieId
    });

    const { data: creditData } = useQuery<IGetCredits>({
        queryKey: ["movies", "credits"],
        queryFn: () => getCredits(movieId),
        enabled: !!movieId
    });

    const openModalFromOutside = (modalId: number) => {

        slidesModalRef.current?.onMovieInfoModal(modalId);
    };

    return (
        <Wrapper>
            {
                isLoading && isLoadingTopRated && isLoadingPopular && isLoadingUpcoming
                    ? <Loader>Loading...</Loader>
                    : (
                        <>
                            <Banner
                                $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                            >
                                <Title>{data?.results[0].original_title}</Title>
                                <Overview>{data?.results[0].overview}</Overview>
                                <ButtonWrapper>
                                    <PlayButton onClick={() => openModalFromOutside(data?.results[0].id as number)}>
                                        <Play />
                                        재생
                                    </PlayButton>
                                    <InfoButton onClick={() => openModalFromOutside(data?.results[0].id as number)}>
                                        <Info />
                                        상세 정보
                                    </InfoButton>
                                </ButtonWrapper>
                            </Banner>
                            {
                                data && (
                                    <SlidesWrap>
                                        <SlidesText>Now Playing</SlidesText>
                                        <Slides
                                            ref={slidesModalRef}
                                            data={data}
                                        />
                                    </SlidesWrap>
                                )
                            }
                            {
                                data && (
                                    <SlidesWrap
                                        style={{
                                            marginTop: "40px"
                                        }}
                                    >
                                        <SlidesText>High Rated</SlidesText>
                                        <Slides
                                            ref={slidesModalRef}
                                            data={topRatedData as IGetMovies}
                                        />
                                    </SlidesWrap>
                                )
                            }
                            {
                                data && (
                                    <SlidesWrap
                                        style={{
                                            marginTop: "40px"
                                        }}
                                    >
                                        <SlidesText>Popular</SlidesText>
                                        <Slides
                                            ref={slidesModalRef}
                                            data={popularData as IGetMovies}
                                        />
                                    </SlidesWrap>
                                )
                            }
                            {
                                data && (
                                    <SlidesWrap
                                        style={{
                                            marginTop: "40px"
                                        }}
                                    >
                                        <SlidesText>Upcoming</SlidesText>
                                        <Slides
                                            ref={slidesModalRef}
                                            data={upcomingData as IGetMovies}
                                        />
                                    </SlidesWrap>
                                )
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
                                            layoutId={movieId + ""}
                                        >
                                            {(modalData && dfModalData && creditData) && (
                                                <>
                                                    <BigCover
                                                        style={{
                                                            backgroundImage: `linear-gradient(0deg, #181818, transparent 50%), url(${makeImagePath(
                                                                modalData.backdrop_path,
                                                                "w780"
                                                            )})`,
                                                        }}
                                                    />
                                                    <ModalCloseButton onClick={onOverlayClick}>
                                                        <X />
                                                    </ModalCloseButton>
                                                    <BigTitle>{dfModalData.title}</BigTitle>
                                                    <ModalContentWrap>
                                                        <MovieInfoWrap>
                                                            <MovieYear>{dfModalData.release_date.replace(/-/g, ".")}</MovieYear>
                                                            <MovieRates><Star /> {dfModalData.vote_average}</MovieRates>
                                                        </MovieInfoWrap>
                                                        <ModalContentLine>
                                                            <BigOverview>{dfModalData.overview}</BigOverview>
                                                            <MovieAttendeesLine>
                                                                <MovieAttendees>
                                                                    <MovieAttendeesTitle>Casting: </MovieAttendeesTitle>
                                                                    <span>
                                                                        {
                                                                            creditData.cast.map((el, idx) => {

                                                                                const comma = idx + 1 !== creditData.cast.length && ', ';

                                                                                return (
                                                                                    <span
                                                                                        key={el.id}
                                                                                    >{el.name}{comma}</span>
                                                                                );
                                                                            })
                                                                        }
                                                                    </span>
                                                                </MovieAttendees>
                                                                <MovieAttendees>
                                                                    <MovieAttendeesTitle>Crews: </MovieAttendeesTitle>
                                                                    <span>
                                                                        {
                                                                            creditData.crew.map((el, idx) => {

                                                                                const comma = idx + 1 !== creditData.crew.length && ', ';

                                                                                return (
                                                                                    <span
                                                                                        key={idx}
                                                                                    >{el.name}{comma}</span>
                                                                                );
                                                                            })
                                                                        }
                                                                    </span>
                                                                </MovieAttendees>
                                                                <MovieAttendees>
                                                                    <MovieAttendeesTitle>Genres: </MovieAttendeesTitle>
                                                                    <span>
                                                                        {
                                                                            modalData.genres.map((el, idx) => {

                                                                                const comma = idx + 1 !== modalData.genres.length && ', ';

                                                                                return (
                                                                                    <span
                                                                                        key={el.id}
                                                                                    >{el.name}{comma}</span>
                                                                                );
                                                                            })
                                                                        }
                                                                    </span>
                                                                </MovieAttendees>
                                                            </MovieAttendeesLine>
                                                        </ModalContentLine>

                                                    </ModalContentWrap>
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