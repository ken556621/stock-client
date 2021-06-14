import { useState, useEffect } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from "@material-ui/icons/PieChart";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
    getIndustryVolumn
} from "@/api/stock";

import IndustryDailyRankBar from "@/components/charts/IndustryDailyRankBar";
import CompanyDetailPopup from "@/components/page-content/individualStock/CompanyDetailPopup";
import CustomPie from "@/components/charts/CustomPie";



const useIndustryDailyRankStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(6),
        padding: theme.spacing(4, 6),
        boxShadow: "0px 2px 14px 0 rgb(69 20 229 / 10%)",
        borderRadius: 15
    },
    titleFilterWrapper: {
        display: "flex",
        justifyContent: "space-between",
        margin: theme.spacing(6, 0)
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
        color: "#0a2f5c"
    },
    label: {
        fontSize: ".5rem",
        color: "#1a1919"
    }
}));

const IndustryDailyRank = () => {
    const classes = useIndustryDailyRankStyles();

    const [targetStock, setTargetStock] = useState("");

    const [industryVolumnList, setIndustryVolumnList] = useState([]);

    const [isShowFirstData, setIsShowFirstData] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const fetchIndustryVolumnList = async () => {
        setIsLoading(true);
        const res = await getIndustryVolumn();

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        const formatedData = formatData(res.data);

        setIndustryVolumnList(formatedData);
        setIsLoading(false);
    };

    const formatData = (data) => {
        return data.map(item => {
            return {
                ...item,
                tradingVolume: Number(item.tradingVolume.split(",").join("")),
                percentage: Number(item.percentage)
            }
        })
    };

    const handleSwitchBtnChange = () => {
        setIsShowFirstData(!isShowFirstData)
    };

    const handleClickName = (stockId) => {
        setTargetStock(stockId);
    };

    const handleClosePopup = () => {
        setTargetStock(null);
    };

    useEffect(() => {
        fetchIndustryVolumnList()
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.titleFilterWrapper}>
                <div className={classes.titleWrapper}>
                    <BarChartIcon className={classes.icon} />
                    <div className={classes.title}>
                        每日類股漲跌幅
                    </div>
                </div>
            </div>
            <IndustryDailyRankBar
                data={industryVolumnList}
                isLoading={isLoading}
            />
            <div className={classes.titleFilterWrapper}>
                <div className={classes.titleWrapper}>
                    <PieChartIcon className={classes.icon} />
                    <div className={classes.title}>
                        每日類股成交組成
                    </div>
                </div>
                <FormControlLabel
                    classes={{
                        label: classes.label
                    }}
                    control={
                        <Switch
                            color="primary"
                            checked={isShowFirstData}
                            onChange={handleSwitchBtnChange}
                        />
                    }
                    label={
                        <>
                            <div>
                                On: 前 1/3 資料
                            </div>
                            <div>
                                Off: 後 2/3 資料
                            </div>
                            <div>
                                (照成交量排序)
                            </div>
                        </>
                    }
                    labelPlacement="end"
                />
            </div>
            <CustomPie
                data={industryVolumnList}
                dataKey="tradingVolume"
                isShowFirstData={isShowFirstData}
                isLoading={isLoading}
            />
            <CompanyDetailPopup
                stockId={targetStock}
                handleClosePopup={handleClosePopup}
            />
        </div>
    )
};

export default IndustryDailyRank;