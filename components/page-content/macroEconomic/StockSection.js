import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import ShowChartIcon from '@material-ui/icons/ShowChart';


const useStockSectionStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4, 6),
        boxShadow: "0px 2px 14px 0 rgb(69 20 229 / 10%)",
        borderRadius: 15
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
    }
}));

const StockSection = () => {
    const classes = useStockSectionStyles();

    return (
        <div className={classes.container}>
            <div className={classes.titleWrapper}>
                <ShowChartIcon className={classes.icon} />
                <div className={classes.title}>
                    股市指數
                </div>
            </div>
        </div>
    )
};

export default StockSection;