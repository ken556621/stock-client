import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import uniqBy from "lodash/uniqBy";
import defaultColors from "@/components/charts/defaultColor";


const testData = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const CustomLine = (props) => {
    const {
        data = []
    } = props;

    const formatData = (data) => {
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

    const renderCustomLine = () => {
        return data.map((item, index) => (
            <Line
                type="monotone"
                dataKey={item.name}
                stroke={defaultColors[index]}
                fill={hexToRgba(defaultColors[index])}
            />
        ))
    };

    console.log(formatData(data))

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
                    <LineChart
                        width={500}
                        height={300}
                        data={formatData(data)}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {renderCustomLine()}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CustomLine;