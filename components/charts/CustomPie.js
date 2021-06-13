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

    }
}));

const CustomPie = (props) => {
    const {
        data = [],
        dataKey = "value",
        isLoading = false
    } = props;

    const classes = useCustomPieStyles();

    const RADIAN = Math.PI / 180;
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

    const seperatedData = splitData(data, dataKey);
    const firstThirdData = seperatedData[0];
    const lastData = seperatedData[1];

    const renderFirstThirdData = () => (
        <Pie
            data={firstThirdData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
        >
            {firstThirdData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={defaultColors[index % defaultColors.length]} />
            ))}
        </Pie>
    );

    const renderLastData = () => (
        <Pie
            data={lastData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
        >
            {firstThirdData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={defaultColors[index % defaultColors.length]} />
            ))}
        </Pie>
    );

    return (
        <div className={classes.container} style={{ height: 300, position: "relative", borderRadius: 20 }}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    top: 0,
                    left: 0
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        {renderFirstThirdData()}
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CustomPie;