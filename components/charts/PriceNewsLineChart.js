import {
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

import StatusImg from "@/components/table/StatusImg";


const PriceNewsLineChart = (props) => {
    const {
        data = [],
        isLoading
    } = props;

    const CustomizedDot = (props) => {
        const { cx, cy, value, payload } = props;

        if (payload.title) {
            return (
                <svg
                    x={cx - 10}
                    y={cy - 10}
                    width={5}
                    height={5}
                    fill="green"
                    viewBox="0 0 1024 1024"
                >
                    <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
                </svg>
            );
        }

        return (
            <svg></svg>
        );
    };

    const combineNewsAndStocks = (stocks, news) => {
        return news.map((item, i) => Object.assign({}, item, stocks[i]));
    };

    const renderLegend = () => {
        return "平均價"
    };

    const renderTooltip = (value) => {
        return [value, "平均價"]
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
                    <AreaChart
                        data={data}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3"
                        />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={renderTooltip} />
                        <Legend formatter={renderLegend} />
                        <Area
                            type="monotone"
                            dataKey="closePrice"
                            stroke="#8884d8"
                            fill="rgba(90,44,221,.1)"
                            dot={<CustomizedDot />}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PriceNewsLineChart;