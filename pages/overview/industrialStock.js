import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import NavigationBar from "@/components/navBar/NavigationBar";
import VolumnHistorySection from "@/components/page-content/industrialStock/VolumnHistorySection";
import Footer from "@/components/footer/Footer";

const useMacroEconomicStyles = makeStyles((theme) => ({
    container: {

    },
    content: {
        minHeight: "calc(100vh - 118px)",
        padding: theme.spacing(4, 6)
    }
}));

const industrialStock = () => {
    const classes = useMacroEconomicStyles();

    return (
        <div className={classes.container}>
            <NavigationBar />
            <div className={classes.content}>
                <VolumnHistorySection />
            </div>
            <Footer />
        </div>
    )
};

export default industrialStock;