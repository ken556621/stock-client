import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    ResponsiveContainer
} from "recharts";

import { makeStyles } from "@material-ui/core/styles";

import defaultColors from "@/components/charts/defaultColor";
import StatusImg from "@/components/table/StatusImg";


const useCustomBarStyles = makeStyles((theme) => ({
    container: {
        height: 500,
        position: "relative",
        borderRadius: 20
    },
    resposiveWrapper: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0
    }
}));

const IndustryDailyRankBar = (props) => {
    const {
        data = [],
        isLoading = false
    } = props;

    const classes = useCustomBarStyles();

    const renderBar = () => {
        return (
            <Bar dataKey="percentage" barSize={6}>
                {
                    data.map((entry, index) => (
                        <Cell key={index} fill={entry.percentage > 0 ? "#ff333a" : "#00ab5e"} />
                    ))
                }
            </Bar>
        )
    };

    const CustomizedAxisTick = (props) => {
        const { x, y, payload } = props;

        const words = payload.value.split("");
        const removedLastTwoWord = words.slice(0, words.length - 3);

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="middle" fill="#285a99" transform="translate(0, 0)">
                    {
                        removedLastTwoWord.map(word => (
                            <tspan x={0} dy={16}>
                                {word}
                            </tspan>
                        ))
                    }
                </text>
            </g>
        )
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
        <div className={classes.container}>
            <div className={classes.resposiveWrapper}>
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
                        <XAxis
                            dataKey="name"
                            interval={0}
                            tick={<CustomizedAxisTick />}
                            height={140}
                        />
                        <YAxis />
                        <Tooltip />
                        {renderBar()}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default IndustryDailyRankBar;