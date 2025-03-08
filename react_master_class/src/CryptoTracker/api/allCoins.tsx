import axios from "axios";

const coinRoot = 'https://api.coinpaprika.com/v1';

export const allCoinsFetch = async () => {

    try {

        const res   = await axios.get(`https://proxy.cors.sh/${coinRoot}/coins`);
        const data  = res.data;
    
        return data;

    } catch (error) {

        console.error(error);
    }
}

export const coinInfoFetch = async (coinId : string | undefined) => {

    try {

        const res   = await axios.get(`${coinRoot}/coins/${coinId}`);
        const data  = res.data;
    
        return data;

    } catch (error) {

        console.error(error);
    }
}

export const coinTickersFetch = async (coinId : string | undefined) => {

    try {

        const res   = await axios.get(`${coinRoot}/tickers/${coinId}`);
        const data  = res.data;
    
        return data;

    } catch (error) {

        console.error(error);
    }
}

export const coinChartFetch = async (coinId : string | undefined) => {

    try {

        const res   = await axios.get(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`);
        const data  = res.data;

        return data;

    } catch (error) {

        console.error(error);
    }
}