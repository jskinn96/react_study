import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, Outlet, Link, useMatch } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingEl from "./Loading";
import axios from "axios";
//g 객체의 타입을 확인하는 함수
import typeTranslateObjConsole from "../../common/typeTranslateConsole"
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { coinInfoFetch, coinTickersFetch } from "../api/allCoins";

//g useParams 사용 시, 기본 타입...키도 스트링인걸 알아야하고 값은 스트링이나 빈 값이 올 수 있다고 정의해야한다(없어도 자동으로 적용)
interface CoinType {
    [key: string]: string | undefined;
}

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_15m: number;
            percent_change_30m: number;
            percent_change_1h: number;
            percent_change_6h: number;
            percent_change_12h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            percent_change_30d: number;
            percent_change_1y: number;
            ath_price: number;
            ath_date: string;
            percent_from_price_ath: number;
        };
    };
}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: [];
    team: [];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: {
        explorer: [];
        facebook: [];
        reddit: [];
        source_code: [];
        website: [];
        youtube: [];
    };
    links_extended: [];
    whitepaper: {
        link: string;
        thumbnail: string;
    };
    first_data_at: string;
    last_data_at: string;
}

const Container = styled.main`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const Title = styled.h1`
    font-size: 48px;
    padding: 10px 0;
    color: ${props => props.theme.yellowColor} 
`;

const InfoSection = styled.section`
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    word-break:
`;

const OverviewWrap = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    padding: 10px 20px;
    position: relative;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    span {
        font-size: 20px;    
        &:first-child {
            font-size: 12px;
        }
    }
    &:nth-child(2) {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const Tabs = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

//g DOM에 props를 넣을 때, 소문자여야 하며 밸류 값은 boolean값이 오면 오류가 난다. 
const Tab = styled.li<{active: string}>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${
        props => (
            props.active === 'true' ? props.theme.accentColor : props.theme.txtColor 
        )
    };
    a {
        display: block;
    }
`;

const Coin = () => {

    const { coinId }                = useParams<CoinType>();
    //g useLocation으로 받는 값은 링크 클릭이 이루어졌을 때, 값을 받을 수 있으므로 주의...한번에 url로 값을 받아올 수 없다.
    const { state }                 = useLocation();
    //g 현재 파라미터 값이 맞는 지 확인 : useMatch
    const chartMatch                = useMatch("/:coinId/chart"); 
    const priceMatch                = useMatch("/:coinId/price"); 
    
    //g useQuery 사용 전
    // const [loading, setLoading]     = useState<boolean>(true);
    // const [priceObj, setPriceObj]   = useState<IPriceData>();
    // const [infoObj, setInfoObj]     = useState<IInfoData>();
    // useEffect(() => {

    //     (async () => {
            
    //         try {

    //             const [{data : priceData}, {data : infoData}] = await axios.all([
    //                 axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`),
    //                 axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`),
    //             ]);

    //             setPriceObj(priceData);
    //             setInfoObj(infoData);
    //             setLoading(false);

    //             //g 타입 변환 함수
    //             // typeTranslateObjConsole(priceData);
    //             // typeTranslateObjConsole(infoData);
                
    //         } catch(error) {
    
    //             console.error(error);
    //         }
    //     })()

    // }, [coinId]);

    //g useQuery 사용 후
    //g queryFn 사용 시, 실행한 함수를 넣는 게 아니라 실행할 함수 자체를 넣어야 하므로 () => 함수(test) 형태가 된다.
    const { isLoading : infoLoading, data : infoObj } = useQuery<IInfoData>({
        queryKey : [coinId, 'info'],
        queryFn : () => coinInfoFetch(coinId),
    });

    //g 주석한 부분은 5초 마다 데이터를 가져올 수 있게 구성한 부분
    const { isLoading : priceLoading, data : priceObj } = useQuery<IPriceData>({
        queryKey : [coinId, 'price'],
        queryFn : () => coinTickersFetch(coinId),
        // refetchInterval : 5000,
        // staleTime: 0,
        // notifyOnChangeProps: "all", 
    });

    //g 둘 중 하나라도 true면 true
    const loading = infoLoading || priceLoading;

    const coinName      = infoObj?.name;
    const coinRank      = infoObj?.rank;
    const coinSymbol    = infoObj?.symbol
    const coinOpSrc     = infoObj?.open_source ? 'Yes' : 'No';
    const coinDesc      = infoObj?.description ? infoObj?.description : 'No description.';
    const coinTSupply   = priceObj?.total_supply;
    const coinMSupply   = priceObj?.max_supply;
    const coinPrice     = priceObj?.quotes.USD.price;
    const roundPrice    = coinPrice?.toFixed(2);

    return (
        <Container>
            <Helmet>
                <title>{coinName}</title>
            </Helmet>
            <Title>
                {
                    state?.name 
                    ? state.name
                    : (
                        loading
                        ? ''
                        : coinName
                    )
                }
            </Title>
            {
                loading
                ? <LoadingEl />
                : (
                    <InfoSection>
                        <OverviewWrap>
                            <OverviewItem>
                                <span>RANK</span>
                                <span>{coinRank}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>SYMBOL</span>
                                <span>${coinSymbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>OPEN SOURCE</span>
                                <span>{coinOpSrc}</span>
                            </OverviewItem>
                        </OverviewWrap>
                        <div>{coinDesc}</div>
                        <OverviewWrap>
                            <OverviewItem>
                                <span>TOTAL SUPPLY</span>
                                <span>{coinTSupply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>MAX SUPPLY</span>
                                <span>{coinMSupply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>PRICE</span>
                                <span>${roundPrice}</span>
                            </OverviewItem>
                        </OverviewWrap>
                    </InfoSection>
                )
            }
            <InfoSection>
                <nav>
                    <Tabs>
                        <Tab 
                        active={`${chartMatch !== null}`}>
                            <Link to={"Chart"}>Chart</Link>
                        </Tab>
                        <Tab
                        active={`${priceMatch !== null}`}>
                            <Link to={"Price"}>Price</Link>
                        </Tab>
                    </Tabs>
                </nav>
                <Outlet context={coinId} />
            </InfoSection>
        </Container>
    );
}

export default Coin;