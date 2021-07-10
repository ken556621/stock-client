import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import NavigationBar from "@/components/navBar/NavigationBar";
import TwEconomic from "@/components/page-content/macroEconomic/TwEconomic";
import StockSection from "@/components/page-content/macroEconomic/StockSection";
import Footer from "@/components/footer/Footer";

const useMacroEconomicStyles = makeStyles((theme) => ({
    container: {

    },
    content: {
        minHeight: "calc(100vh - 156px)",
        padding: theme.spacing(4, 6)
    }
}));

const macroEconomic = () => {
    const classes = useMacroEconomicStyles();

    return (
        <div className={classes.container}>
            <NavigationBar />
            <div className={classes.content}>
                <TwEconomic />
                <StockSection />
            </div>
            <Footer />
        </div>
    )
};

export default macroEconomic;