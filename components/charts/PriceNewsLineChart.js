import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";


const PriceNewsLineChart = (props) => {
    const {
        data = [],
    } = props;

    return (
        <div style={{ height: 250, position: "relative" }}>
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
                    <LineChart
                        data={data}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3"
                        />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="averagePrice" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PriceNewsLineChart;