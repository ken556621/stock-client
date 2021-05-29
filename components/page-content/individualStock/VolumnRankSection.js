import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import ShowChartIcon from '@material-ui/icons/ShowChart';

import {
    getVolumnRank
} from "@/api/individualStock";

import { BasicTable } from "@/components/table/Table";
import clsx from "clsx";


const useMacroEconomicStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4, 6),
        boxShadow: "0px 2px 14px 0 rgb(69 20 229 / 10%)",
        borderRadius: 15
    },
    titleWrapper: {
        display: "flex",
        alignItems: "center",
        color: "#1a1919",
        fontSize: "1.125rem",
        marginBottom: theme.spacing(4)
    },
    title: {
        marginLeft: theme.spacing(2),
        "&:before": {
            content: "''",
            height: 30,
            width: 30,
            borderLeft: "1px solid #eee",
            paddingLeft: theme.spacing(2)
        }
    },
    icon: {
        color: "#5585c2"
    },
    header: {
        wordBreak: "keep-all"
    },
    goingUp: {
        color: "#ff333a"
    },
    goingDown: {
        color: "#00ab5e"
    }
}));

const VolumnRankSection = () => {
    const classes = useMacroEconomicStyles();

    const [volumnRankList, setVolumnRankList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchVolumnRankList = async () => {
        setIsLoading(true);
        const res = await getVolumnRank();

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        const formatedTableData = formatTableData(res.data);

        setVolumnRankList(formatedTableData);
        setIsLoading(false);
    };

    const formatTableData = (data) => {
        return data.map((item, index) => {
            return {
                rank: index,
                name: item.name + "," + item.id,
                price: item.price,
                percentage: item.percentage
            }
        })
    };

    const tableColumn = [
        {
            id: "rank",
            width: 80,
            fixed: "left",
            label: (
                <div className={classes.header}>
                    排名
                </div>
            ),
            component(data) {
                return (
                    <div className={classes.rank}>
                        {data.rank}
                    </div>
                )
            }
        },
        {
            id: "name",
            width: "33%",
            label: (
                <div className={classes.header}>
                    名稱 / 代號
                </div>
            ),
            component(data) {
                const name = data.name.split(",")[0];
                const id = data.name.split(",")[1];
                return (
                    <>
                        <div className={classes.name}>
                            {name}
                        </div>
                        <div className={classes.id}>
                            {id}
                        </div>
                    </>
                )
            }
        },
        {
            id: "price",
            width: "33%",
            label: (
                <div className={classes.header}>
                    價格
                </div>
            ),
            component(data) {
                return (
                    <div className={classes.price}>
                        {data.price}
                    </div>
                )
            }
        },
        {
            id: "percentage",
            width: "33%",
            label: (
                <div className={classes.header}>
                    漲幅 / 跌幅
                </div>
            ),
            component(data) {
                const isGoingUp = data.percentage.split(",")[0] === "+";
                const isGoingDown = data.percentage.split(",")[0] === "-";
                const number = data.percentage.split(",")[1] || data.percentage;
                return (
                    <div
                        className={clsx({
                            [classes.goingUp]: isGoingUp,
                            [classes.goingDown]: isGoingDown
                        })}
                    >
                        {number}
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        fetchVolumnRankList()
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.titleWrapper}>
                <ShowChartIcon className={classes.icon} />
                <div className={classes.title}>
                    台股排行榜
                </div>
            </div>
            <BasicTable
                classes={{
                    col: classes.col,
                    th: classes.th,
                    tableHead: classes.tableHead,
                    tableBody: classes.tableBody
                }}
                isLoading={isLoading}
                data={volumnRankList}
                columns={tableColumn}
                pagination
                defaultImgWord={"No Data Found"}
            />
        </div>
    )
};

export default VolumnRankSection;