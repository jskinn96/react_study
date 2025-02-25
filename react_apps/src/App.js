import { useState, useEffect } from "react";

const LoadingEl = () => {

    return (<strong>loading...</strong>);
}

function App() {
    
    const [loading, loadingFunc]    = useState(true); 
    const [coins, getCoinsFunc]     = useState([]); 
    const [USDAmt, USDAmtFunc]      = useState(0);
    const [coinsAmt, coinsAmtFunc]  = useState(0);
    const [coinsSym, coinsSymFunc]  = useState('');
    const [USDCoins, USDCoinsFunc]  = useState(0);

    useEffect(() => {
        
        const fetchConinsData = async () => {
            
            try {
                
                const res       = await fetch('https://api.coinpaprika.com/v1/tickers');
                const coinsJson = await res.json();
                const dfCoinSym = coinsJson[0]['symbol']; 
                const dfCoinPrc = coinsJson[0].quotes.USD.price;

                loadingFunc(false);
                getCoinsFunc(coinsJson);
                coinsAmtFunc(dfCoinPrc);
                coinsSymFunc(dfCoinSym); 

            } catch(error) {

                console.error(error);
            }
        } 
        fetchConinsData();

    }, [])


    const USDAmtFn = (e) => {

        const input     = e.target;
        const inputVal  = input.value.slice(0, 1) === '0'
        ? input.value.slice(1)
        : input.value;

        inputVal !== ""
        ? USDAmtFunc(inputVal)
        : USDAmtFunc(0);
    }

    const coinsAmtFn = (e) => {

        const select    = e.target;
        const selectVal = select.value;
        const selectOpt = select.options[select.selectedIndex];
        const selectSym = selectOpt.dataset.symbol;
        
        coinsAmtFunc(selectVal);
        coinsSymFunc(selectSym);
    }
    
    useEffect(() => {
        
        if (USDAmt > 0 && coinsAmt > 0) {

            const translate = USDAmt / coinsAmt;
            USDCoinsFunc(translate);

        } else {

            USDCoinsFunc(0);
        }

    }, [USDAmt, coinsAmt])

    return (
        <div>
            <h1>The Coins!</h1>
            {
                loading === true
                ? (
                    <LoadingEl />
                ) : (
                    <div
                    style={{
                        display : 'flex',
                        flexDirection : 'column',
                        gap : '10px',
                        justifyContent : 'center',
                        alignItems : 'flex-start'
                    }}
                    >
                        <select
                        onClick={coinsAmtFn}
                        >
                            {
                                coins.map((coin, idx) => {

                                    const coinName = coin.name;
                                    const coinSymbol = coin.symbol;
                                    const coinPrice = coin.quotes.USD.price;

                                    return (
                                    <option 
                                    key={idx}
                                    value={coinPrice}
                                    data-symbol={coinSymbol}>{coinName} {coinSymbol} {coinPrice} USD
                                    </option>
                                    );
                                })
                            }
                        </select>
                        <div>
                            <input
                            id="USDChanger" 
                            type="number"
                            placeholder="USD to Conins"
                            value={USDAmt}
                            onChange={USDAmtFn}
                            />
                            <label htmlFor="USDChanger"> USD</label>
                        </div>
                        <div>You can buy {USDCoins} {coinsSym} with {USDAmt} USD.</div>
                    </div>
                )
            }
        </div>
    );
}

export default App;