import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { coinChartFetch } from "../api/allCoins";
import Chart from "react-apexcharts";
import typeTranslateObjConsole from "../../common/typeTranslateConsole";
import LoadingEl from "./Loading";

interface Idata {   
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

const CoinChart = () => {

    const coinId: string = useOutletContext();
    const {isLoading, data : chartData} = useQuery<Idata[]>({
        queryKey : [coinId, "chart"],
        queryFn : () => coinChartFetch(coinId)
    });

    // typeTranslateObjConsole(chartData);

    const safeChartData = Array.isArray(chartData) ? chartData : [];

    const closePriceData = safeChartData.map((el) => {
        
        const close = Number(el.close);
        
        return isNaN(close) ? 0 : close;
    });

    const timeCloseData = safeChartData.map((el) => Number(el.time_close) * 1000);

    return (
        <div>
            {
                isLoading ? (
                    <LoadingEl />
                )
                : (
                    <Chart 
                    type="line"
                    series={[
                        {
                          name: "Price",
                          data: closePriceData,
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: {
                            show: false 
                        },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: {
                                show: false
                            },
                            axisTicks: {
                                show: false
                            },
                            labels: {
                                show: false 
                            },
                            type: "datetime",
                            categories: timeCloseData, 
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#0be881"], 
                                stops: [0, 100]
                            },
                        },
                          colors: ["#0fbcf9"],
                          tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`,
                            },
                        },
                      }}
                    />
                )
            }
        </div>
    );
}

export default CoinChart;