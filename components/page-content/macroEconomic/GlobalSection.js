import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import PublicIcon from '@material-ui/icons/Public';


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

const GlobalSection = () => {
    const classes = useMacroEconomicStyles();

    return (
        <div className={classes.container}>
            <div className={classes.titleWrapper}>
                <PublicIcon className={classes.icon} />
                <div className={classes.title}>
                    美國經濟指數
                </div>
            </div>
            <div className={classes.cpi}>

            </div>
            <div className={classes.pmi}>

            </div>
            <div className={classes.unemploymentRate}>

            </div>
            <div className={classes.titleWrapper}>
                <PublicIcon className={classes.icon} />
                <div className={classes.title}>
                    台灣經濟指數
                </div>
            </div>
            <div className={classes.cpi}>

            </div>
            <div className={classes.pmi}>

            </div>
            <div className={classes.unemploymentRate}>

            </div>
        </div>
    )
};

export default GlobalSection;