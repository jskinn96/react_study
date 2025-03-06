import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import LoadingEl from "./Loading";
import axios from "axios";
//g 객체의 타입을 확인하는 함수
import typeTranslateObjConsole from "../../common/typeTranslateConsole"

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

const Coin = () => {

    const { coinId }                = useParams<CoinType>();
    const [loading, setLoading]     = useState<boolean>(true);
    const [priceObj, setPriceObj]   = useState<IPriceData>();
    const [infoObj, setInfoObj]     = useState<IInfoData>();
    //g useLocation으로 받는 값은 링크 클릭이 이루어졌을 때, 값을 받을 수 있으므로 주의...한번에 url로 값을 받아올 수 없다.
    const { state }                 = useLocation();

    useEffect(() => {

        (async () => {
            
            try {

                const [{data : priceData}, {data : infoData}] = await axios.all([
                    axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`),
                    axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`),
                ]);

                setPriceObj(priceData);
                setInfoObj(infoData);
                setLoading(false);

                //g 타입 변환 함수
                // typeTranslateObjConsole(priceData);
                // typeTranslateObjConsole(infoData);
                
            } catch(error) {
    
                console.error(error);
            }
        })()

    }, [coinId]);

    return (
        <div>
            {
                loading
                ? <LoadingEl />
                : (
                    <div>
                        Coin ID : {coinId}<br />
                        Coin Name : {state.name}
                    </div>
                )
            }
        </div>
    );
}

export default Coin;