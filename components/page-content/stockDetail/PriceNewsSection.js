import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import ShowChartIcon from "@material-ui/icons/ShowChart";

import PriceNewsLineChart from "@/components/charts/PriceNewsLineChart";
import CustomDateInput from "@/components/datePicker/CustomDateInput";

import {
    getDailyPriceVolumn
} from "@/api/stock";

const usePriceNewsSectionStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4, 6),
        boxShadow: "0px 2px 14px 0 rgb(69 20 229 / 10%)",
        borderRadius: 15
    },
    titleDatePickerWrapper: {
        marginBottom: theme.spacing(4),
        display: "flex",
        justifyContent: "space-between"
    },
    titleWrapper: {
        display: "flex",
        alignItems: "center",
        color: "#1a1919",
        fontSize: "1.125rem"
    },
    icon: {
        color: "#5585c2"
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
    datePickerRoot: {
        "& input": {
            border: "none"
        }
    }
}));

const PriceNewsSection = (props) => {
    const {
        stockName = "",
        stockNews = []
    } = props;

    const classes = usePriceNewsSectionStyles();

    const router = useRouter();

    const [priceVolumnData, setPriceVolumnData] = useState([]);

    // 預設 7 天前，不能選超過當天
    const [startDate, setStartDate] = useState(dayjs().subtract(7, "day").$d);
    const [endDate, setEndDate] = useState(new Date());

    const [isLoading, setIsLoading] = useState(false);

    const stockId = router.query.stockId;

    const fetchPriceVolumn = async () => {
        setIsLoading(true);
        const postData = {
            body: {
                stockId,
                startDate: dayjs(startDate).format("YYYY/MM/DD"),
                endDate: dayjs(endDate).format("YYYY/MM/DD")
            }
        };

        const res = await getDailyPriceVolumn(postData);

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        setPriceVolumnData(res.data);
        setIsLoading(false);
    };

    const updateSelectedDate = (dates) => {
        const {
            startDate,
            endDate
        } = dates;

        setStartDate(startDate);
        setEndDate(endDate);
    };

    useEffect(() => {
        if (!stockId) return

        fetchPriceVolumn()
    }, [startDate, endDate])

    return (
        <div className={classes.container}>
            <div className={classes.titleDatePickerWrapper}>
                <div className={classes.titleWrapper}>
                    <ShowChartIcon className={classes.icon} />
                    <div className={classes.title}>
                        {stockName}
                    </div>
                </div>
                <div className={classes.datePickerRoot}>
                    <CustomDateInput
                        updateSelectedDate={updateSelectedDate}
                    />
                </div>
            </div>
            <PriceNewsLineChart
                data={priceVolumnData}
                isLoading={isLoading}
            />
        </div>
    )
};

export default PriceNewsSection;