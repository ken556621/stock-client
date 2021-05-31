import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import uniqBy from "lodash/uniqBy";

import defaultColors from "@/components/charts/defaultColor";
import StatusImg from "@/components/table/StatusImg";


const CustomArea = (props) => {
    const {
        data = [],
        industrialList = [],
        isLoading = false
    } = props;

    const formatChartData = (data) => {
        const result = [];

        data.forEach(item => {
            result.forEach(industry => {
                if (industry.date === item.dataSourceDate) {
                    industry[item.name] = Number(item.tradingVolume.split(",").join('')) / 1000
                    return
                }
            })
            result.push({
                date: item.dataSourceDate,
                [item.name]: Number(item.tradingVolume.split(",").join('')) / 1000
            })
        })

        const uniqResultArray = uniqBy(result, ele => {
            return ele.date
        })

        return uniqResultArray
    };

    const formatedData = formatChartData(data);

    const hexToRgba = hex => {
        let c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',.1)';
        }
        throw new Error('Bad Hex');
    };

    const renderCustomArea = () => {
        return industrialList.map((item, index) => (
            <Area
                key={index}
                type="monotone"
                dataKey={item}
                stroke={defaultColors[index]}
                fill={hexToRgba(defaultColors[index])}
            />
        ))
    };

    if (isLoading) {
        return (
            <StatusImg type="loading" word="Data is loading" />
        )
    }

    return (
        <div style={{ height: 500, position: "relative" }}>
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
                        width={500}
                        height={300}
                        data={formatedData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {renderCustomArea()}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CustomArea;