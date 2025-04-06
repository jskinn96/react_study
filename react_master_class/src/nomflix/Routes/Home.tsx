import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMovies } from "../Api/MovieApi";
import styled from "styled-components";
import { makeImagePath } from "../Utils/Utils";

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

const Home = () => {

    const { data, isLoading } = useQuery<IGetMovies>({
        queryKey: ["movies", "nowPlaying"],
        queryFn: getMovies,
    });

    return (
        <Wrapper>
            {
                isLoading
                    ? <Loader>Loading...</Loader>
                    : (
                        <Banner
                            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                        >
                            <Title>{data?.results[0].title}</Title>
                            <Overview>{data?.results[0].overview}</Overview>
                        </Banner>
                    )
            }
        </Wrapper>
    );
}

export default Home;