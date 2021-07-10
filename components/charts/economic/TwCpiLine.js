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



const TwCpiLine = (props) => {
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
                        <XAxis dataKey="月別" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="消費者物價-指數"
                            stroke="#8884d8"
                        />
                        <Line
                            type="monotone"
                            dataKey="基本工資（元）-時薪"
                            stroke="#43A4AA"
                        />
                        <Line
                            type="monotone"
                            dataKey="失業率"
                            stroke="#F36B24"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default TwCpiLine;