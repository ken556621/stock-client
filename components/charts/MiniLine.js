import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    ResponsiveContainer
} from "recharts";

import {
    getYearlyPriceVolumn
} from "@/api/individualStock";


const MiniLine = (props) => {
    const {
        stockId = ""
    } = props;

    const [priceVolumnData, setPriceVolumnData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchYearlyPriceVolumn = async () => {
        setIsLoading(true);
        const postData = {
            body: {
                stockId
            }
        };

        const res = await getYearlyPriceVolumn(postData);

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        setPriceVolumnData(res.data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!stockId) return

        fetchYearlyPriceVolumn()
    }, [stockId]);

    return (
        <div style={{ height: 70, position: "relative" }}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={300} height={100} data={priceVolumnData}>
                        <Line type="monotone" dataKey={"highestPrice"} stroke="#ff333a" strokeWidth={2} />
                        <Line type="monotone" dataKey={"lowestPrice"} stroke="#00ab5e" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MiniLine;