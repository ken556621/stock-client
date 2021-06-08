import { useState } from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer
} from "recharts";

import CompanyDetailPopup from "@/components/page-content/individualStock/CompanyDetailPopup";
import defaultColors from "@/components/charts/defaultColor";
import StatusImg from "@/components/table/StatusImg";


const CustomBar = (props) => {
    const {
        data = [],
        matrixSchema = [],
        isLoading = false
    } = props;

    const [targetStock, setTargetStock] = useState("");

    const handleClickBar = (e) => {
        const stockId = findStockIdByName(e.value);
        setTargetStock(stockId)
    };

    const findStockIdByName = (name) => {
        let stockId = ""

        data.forEach(item => {
            if (item.name === name) {
                stockId = item.stockId
            }
        })

        return stockId
    };

    const renderCustomizedLabel = (props) => {
        const { x, y, width, height, value } = props;
        const radius = 10;

        return (
            <g>
                <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
                <text
                    x={x + width / 2}
                    y={y - radius}
                    fill="#fff"
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    毛
                </text>
            </g>
        );
    };

    const renderLegend = (value, entry, index) => {
        let result = "";

        matrixSchema.forEach(item => {
            if (item.value === value) {
                result = item.label
            }
        });

        return result
    };

    const renderBar = () => {
        return matrixSchema.map((matrix, index) => (
            <Bar dataKey={matrix.value} fill={defaultColors[index]}>
                {
                    matrix.value === "grossMargin" && (
                        <LabelList dataKey="name" content={renderCustomizedLabel} />
                    )
                }
            </Bar>
        ))
    };

    if (isLoading) {
        return (
            <StatusImg type="loading" word="Data is loading" />
        )
    }

    if (!data.length) {
        return (
            <StatusImg />
        )
    }

    return (
        <div style={{ height: 500, position: "relative", borderRadius: 20 }}>
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
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" onClick={handleClickBar} />
                        <YAxis />
                        <Tooltip />
                        <Legend
                            formatter={renderLegend}
                        />
                        {renderBar()}
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <CompanyDetailPopup
                stockId={targetStock}
            />
        </div>
    )
}

export default CustomBar;