import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import ShowChartIcon from '@material-ui/icons/ShowChart';

import CustomLine from "@/components/charts/CustomLine";

import {
    getIndustryVolumn
} from "@/api/individualStock";

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
    }
}));

const VolumnHistorySection = () => {
    const classes = useMacroEconomicStyles();

    const [industryVolumnList, setIndustryVolumnList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchIndustryVolumnList = async () => {
        setIsLoading(true);
        const res = await getIndustryVolumn();

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        setIndustryVolumnList(res.data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchIndustryVolumnList();
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.titleWrapper}>
                <ShowChartIcon className={classes.icon} />
                <div className={classes.title}>
                    類股成交量
                </div>
            </div>
            <CustomLine
                data={industryVolumnList}
            />
        </div>
    )
};

export default VolumnHistorySection;