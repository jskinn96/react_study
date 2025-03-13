import { useOutletContext } from "react-router-dom";
import IInfo from "../types/coinInfo";
import { toKMBT } from "../../utils/common";
import styled from "styled-components";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Iprice {
    "title" : string,
    "val"   : number,
}

const Wrap = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

const Container = styled.div`
    background: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    padding: 10px 20px;
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
`;

const TextWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    span {    
        &:last-child {
            font-size: 26px;
            font-weight: bold;
            color: ${props => props.color};
        }
    }
`;

const Price = () => {

    const { infoObj } = useOutletContext<{infoObj : IInfo}>();
    
    const pricePer: Iprice[] = [
        {
            "title" : "1 hour", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_1h_in_currency?.usd),
        },
        {
            "title" : "24 hour", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_24h),
        },
        {
            "title" : "7 days", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_7d),
        },
        {
            "title" : "14 days", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_14d),
        },
        {
            "title" : "30 days", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_30d),
        },
        {
            "title" : "60 days", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_60d),
        },
        {
            "title" : "200 days", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_200d),
        },
        {
            "title" : "1 year", 
            "val"   : Number(infoObj?.market_data?.price_change_percentage_1y),
        },
    ];

    return (
        <Wrap>
            {
                pricePer.map((el, i) => {
                    
                    const title = el.title;
                    const value = el.val;
                    
                    let priceColor;
                    if (value >= 0) {

                        priceColor = "#26a69a";

                    } else {
                        
                        priceColor = "#ef5350";
                    }

                    return (
                    <Container key={i}>
                        <TrendingUp size={64} color={priceColor} />
                        <TextWrap color={priceColor}>
                            <span>{title}</span>
                            <span>{toKMBT(value)}%</span>
                        </TextWrap>
                    </Container>
                    );
                })
            }
        </Wrap>
    );
}

export default Price;