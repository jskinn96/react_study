import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { allCoinsFetch } from "../api/allCoins";
import LoadingEl from "./Loading";

const Container = styled.main`
    padding: 20px;
    display: flex;
    justify-content: center;
`;

const CoinList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Coin = styled.li`
    background-color: #fff;
    color: #111;
    font-weight: bold;
    border-radius: 18px;
    box-shadow: 5px 5px 10px rgba(255, 255, 255, .5);
    a {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 20px;
        transition: color .1s ease-in;
        &:hover {
            color: ${props => props.theme.accentColor}
        }
    }
`;

const CoinImg = styled.img`
    width: 25px;
    height: 25px;
`;

interface ICoin {
    id          : string,
    name        : string,
    symbol      : string,
    rank        : number,
    is_new      : boolean,
    is_active   : boolean,
    type        : string,
}

const CoinMain = () => {

    //g 리액트 쿼리 사용 전
    // const [coinData, setCoinData]   = useState<coinDataType[]>([]);
    // const [loading, setLoading]     = useState<boolean>(true);

    // useEffect(() => {

    //     (async () => {
            
    //         try {

    //             const res       = await axios.get('https://proxy.cors.sh/https://api.coinpaprika.com/v1/coins');
    //             const resData   = res.data.slice(0, 100);

    //             setCoinData(resData);
    //             setLoading(false); 

    //         } catch(error) {

    //             console.error(error);
    //         }

    //     })();

    // }, []);

    //g 사용 후
    /**
     * g react-query v4 이상 부터는 무조건 객체 형태로 전달해야한다.
     * g queryKey : 	캐싱과 리패칭을 위한 키 (배열 형태 권장) (ex.데이터 캐싱 시, 특정 키값을 가진 데이터만 초기화 한다던지하는 데이터 조작 시 사용)
     * g queryFn : 데이터를 가져오는 비동기 함수
     * g enabled : false면 자동으로 실행되지 않음 (수동 실행 가능)
     * g staleTime : 데이터가 최신 상태로 유지되는 시간 (ms) (최신 상태로 인식하기에 데이터를 다시 불러오지 않고 캐시에 저장해둔 데이터 사용)
     * g cacheTime : 캐시에 남아 있는 시간 (기본 5분)
     * g refetchOnMount : 마운트될 때 다시 데이터를 불러올지 여부 (기본 true)
     * g refetchOnWindowFocus : 창으로 다시 돌아올 때 리패칭 여부 (기본 true)
     * g retry : 데이터 불러오기 실패 시, 재시도 기능 (ex. retry : 3)
     * 
    */
    const {data, isLoading} = useQuery<ICoin[]>({
        queryKey : ["allCoins"], 
        queryFn : allCoinsFetch,
    });
    const coinData = data?.slice(0, 100);

    /**
     * g Link state를 통해서 값을 보내줄 수도 있다. v5와 사용 방식이 다르다.
     * g state 값을 받을 때는 useLocation()을 사용하면 된다.
    */ 
    return (
        <Container>
            <CoinList>
                {
                    isLoading
                    ? (
                        <LoadingEl />
                    )
                    : (
                        coinData?.map((el) => {
                            
                            const coinId    = el.id;
                            const coinName  = el.name;
                            const coinSym   = el.symbol;
                            
                            return (
                                <Coin key={coinId}>
                                    <Link 
                                    to={coinId} 
                                    state={{
                                        name : coinName
                                    }}>
                                        <CoinImg src={`https://cryptoicon-api.pages.dev/icons/128/color/${coinSym.toLowerCase()}.png`} />
                                        {coinName} &rarr;
                                    </Link>
                                </Coin>
                            );
                        })
                    )
                }
            </CoinList>
        </Container>
    );
}

export default CoinMain;