import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingEl from "./Loading";

const Container = styled.div`
    padding: 40px;
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

interface coinDataType {
    id          : string,
    name        : string,
    symbol      : string,
    rank        : number,
    is_new      : boolean,
    is_active   : boolean,
    type        : string,
}

const CoinMain = () => {

    const [coinData, setCoinData]   = useState<coinDataType[]>([]);
    const [loading, setLoading]     = useState<boolean>(true);

    useEffect(() => {

        (async () => {
            
            try {

                const res       = await axios.get('https://proxy.cors.sh/https://api.coinpaprika.com/v1/coins');
                const resData   = res.data.slice(0, 100);

                setCoinData(resData);
                setLoading(false); 

            } catch(error) {

                console.error(error);
            }

        })();

    }, []);

    /**
     * g Link state를 통해서 값을 보내줄 수도 있다. v5와 사용 방식이 다르다.
     * g state 값을 받을 때는 useLocation()을 사용하면 된다.
    */ 
    return (
        <Container>
            <CoinList>
                {
                    loading
                    ? (
                        <LoadingEl />
                    )
                    : (
                        coinData.map((el) => {
                            
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