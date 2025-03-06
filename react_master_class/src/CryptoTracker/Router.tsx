import { createBrowserRouter } from "react-router-dom";
import App from "./CoinApp";
import Coin from "./component/Coin";
import CoinMain from "./component/CoinMain";

export const router = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        children : [
            {
                path : "",
                element : <CoinMain />
            },
            {
                path : ":coinId",
                element : <Coin />
            }
        ]
    }
]);