import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import PublicIcon from '@material-ui/icons/Public';

import TwCpiLine from "@/components/charts/economic/TwCpiLine";

import {
    getTwIndex
} from "@/api/economic";


const useTwEconomicStyles = makeStyles((theme) => ({
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
    },
    cpi: {

    },
    pmi: {

    },
    unemploymentRate: {

    }
}));

const TwEconomic = () => {
    const classes = useTwEconomicStyles();

    const [twIndex, setTwIndex] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchTwIndex = async () => {
        setIsLoading(true);
        const res = await getTwIndex();

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        setTwIndex(res.data)
    }

    useEffect(() => {
        fetchTwIndex()
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.titleWrapper}>
                <PublicIcon className={classes.icon} />
                <div className={classes.title}>
                    台灣經濟指數
                </div>
            </div>
            <div className={classes.cpi}>
                <TwCpiLine
                    data={twIndex}
                />
            </div>
            <div className={classes.pmi}>

            </div>
            <div className={classes.unemploymentRate}>

            </div>
        </div>
    )
};

export default TwEconomic;