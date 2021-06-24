import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    ResponsiveContainer
} from "recharts";

import {
    getMonthlyPriceVolumn
} from "@/api/stock";


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

        const res = await getMonthlyPriceVolumn(postData);

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
        <div style={{ height: 100, position: "relative" }}>
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
                    <LineChart data={priceVolumnData}>
                        <Line type="monotone" dataKey={"averagePrice"} stroke="#ff333a" strokeWidth={1} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MiniLine;