
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";


const useStockListStyles = makeStyles(theme => ({
    container: {
        position: "absolute",
        width: 500,
        boxShadow: "0px 0px 14px rgba(137, 174, 255, 0.2)",
        borderRadius: 6
    },
    itemWrapper: {
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        "&:not(&:last-of-type)": {
            marginBottom: theme.spacing(2)
        },
        "&:hover": {
            boxShadow: "0px 0px 12px #eee"
        }
    },
    stockName: {
        color: "#1a1919"
    },
    stockId: {
        color: "#5b636a"
    },
    country: {
        color: "#5b636a"
    },
    padding: {
        padding: theme.spacing(2),
        height: 300,
        overflow: "scroll"
    }
}))

const StockList = (props) => {
    const {
        data = [],
        handleClickTargetStock = null
    } = props;

    const classes = useStockListStyles();

    const handleClickList = (targetStock) => {
        const {
            name,
            symbol
        } = targetStock;

        handleClickTargetStock && handleClickTargetStock({ name, symbol })
    };

    return (
        <div
            className={clsx(classes.container, {
                [classes.padding]: data.length
            })}
        >
            {
                data.map(item => (
                    <div
                        className={classes.itemWrapper}
                        onClick={() => handleClickList(item)}
                        key={item.symbol}
                    >
                        <div className={classes.stockName}>
                            {item.name}
                            <div className={classes.stockId}>
                                {item.symbol}
                            </div>
                        </div>
                        <div className={classes.country}>
                            {item.exchDisp}
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default StockList;