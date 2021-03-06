import { useState } from "react";
import {
    Treemap,
    ResponsiveContainer
} from "recharts";

import CompanyDetailPopup from "@/components/page-content/individualStock/CompanyDetailPopup";
import defaultColors from "@/components/charts/defaultColor";
import StatusImg from "@/components/table/StatusImg";

import {
    splitData
} from "@/helper/format";


const CustomTreemap = (props) => {
    const {
        data = [],
        dataKey = "size",
        isLoading = false
    } = props;

    const [targetStock, setTargetStock] = useState("");

    const handleClickTreemap = (stockId) => {
        setTargetStock(stockId)
    };

    const renderContent = (props) => {
        const { x, y, width, height, name, stockId, value } = props;

        const fontSize = width * 0.1 < 14 || height * 0.1 < 14 ? 14 : (width + height) / 2 * 0.1;
        const fontX = x + width / 2;
        const fontY = y + height / 2 - 5;

        return (
            <svg
                style={{ cursor: "pointer" }}
                onClick={() => handleClickTreemap(stockId)}
            >
                <text
                    x={fontX}
                    y={fontY}
                    textAnchor="middle"
                    fontWeight={400}
                    fill="#fff"
                    fontSize={fontSize}
                >
                    {name}
                </text>
                <text
                    x={fontX}
                    y={fontY + fontSize + 5}
                    textAnchor="middle"
                    fontWeight={400}
                    fill="#fff"
                    fontSize={fontSize}
                >
                    {value + "%"}
                </text>
            </svg>
        )
    };

    const CustomizedContent = (props) => {
        const { x, y, width, height, index, value, colors } = props;

        if (!value) return null;
        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill: colors[index % 14],
                        strokeWidth: 0
                    }}
                />
                {renderContent(props)}
            </g>
        );
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

    if (data.every(item => !item[dataKey])) {
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
                    <Treemap
                        width={400}
                        height={200}
                        data={data}
                        animationDuration={300}
                        dataKey={dataKey}
                        content={<CustomizedContent colors={defaultColors} />}
                    />
                </ResponsiveContainer>
            </div>
            <CompanyDetailPopup
                stockId={targetStock}
            />
        </div>
    )
}

export default CustomTreemap;