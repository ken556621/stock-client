import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer
} from "recharts";

import { makeStyles } from "@material-ui/core/styles";

import defaultColors from "@/components/charts/defaultColor";
import StatusImg from "@/components/table/StatusImg";
import {
    splitData
} from "@/helper/format";

const useCustomPieStyles = makeStyles((theme) => ({
    container: {
        height: 450,
        position: "relative",
        borderRadius: 20
    },
    resposiveWrapper: {
        width: "100%",
        height: "100%",
        position: "relative",
        top: 0,
        left: 0
    }
}));

const CustomPie = (props) => {
    const {
        data = [],
        dataKey = "value",
        isLoading = false,
        isShowFirstData = true
    } = props;

    const classes = useCustomPieStyles();

    const RADIAN = Math.PI / 180;

    const filterData = (data) => {
        const seperatedData = splitData(data, "tradingVolume");
        const firstThirdData = seperatedData[0];
        const lastData = seperatedData[1];

        if (data.length <= 10) {
            return data
        }
        if (isShowFirstData) {
            return firstThirdData
        }
        return lastData
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const renderPie = () => {
        const filteredData = filterData(data);

        return (
            <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey={dataKey}
            >
                {
                    filteredData.map((entry, index) => (
                        <Cell key={index} fill={defaultColors[index]} />
                    ))
                }
            </Pie>
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

    return (
        <div className={classes.container}>
            <div className={classes.resposiveWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        {renderPie()}
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={100} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CustomPie;