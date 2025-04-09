import { useState } from "react";
import styled from "styled-components";
import { IGetMovies } from "../Api/MovieApi";

const TOTAL_SLIDES = 20; // 전체 슬라이드 수
const VISIBLE_COUNT = 6;

const SliderWrapper = styled.div`
    overflow: hidden;
    position: relative;
    padding: 0 60px;
    width: 100%;
`;

const SliderTrack = styled.div<{ index: number }>`
    display: flex;
    transition: transform 0.5s ease;
    transform: translateX(${({ index }) => `-${index * (100 / 6)}%`});
`;

const SlideBox = styled.div`
    flex: 0 0 calc(100% / 6);
    padding: 0 0.2vw;
    box-sizing: border-box;
`;


const Slides = (data: IGetMovies) => {
    const [index, setIndex] = useState(0);

    const next = () => {
        if (index < TOTAL_SLIDES - VISIBLE_COUNT) {
            setIndex(index + 1);
        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    return (
        <SliderWrapper>
            <SliderTrack index={index}>
                {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                    <SlideBox key={i}>Slide {i + 1}</SlideBox>
                ))}
            </SliderTrack>

            <button onClick={prev}>◀</button>
            <button onClick={next}>▶</button>
        </SliderWrapper>
    );
};

export default Slides