import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import ShowChartIcon from "@material-ui/icons/ShowChart";

import PriceNewsLineChart from "@/components/charts/PriceNewsLineChart";

const usePriceNewsSectionStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4, 6),
        boxShadow: "0px 2px 14px 0 rgb(69 20 229 / 10%)",
        borderRadius: 15
    },
    titleWrapper: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(4),
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
    }
}));

const PriceNewsSection = (props) => {
    const {
        stockName = "",
        priceVolumnData = []
    } = props;
    const classes = usePriceNewsSectionStyles();

    return (
        <div className={classes.container}>
            <div className={classes.titleWrapper}>
                <ShowChartIcon className={classes.icon} />
                <div className={classes.title}>
                    {stockName}
                </div>
            </div>
            <PriceNewsLineChart
                data={priceVolumnData}
            />
        </div>
    )
};

export default PriceNewsSection;