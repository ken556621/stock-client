import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import NavigationBar from "@/components/navBar/NavigationBar";
import GlobalSection from "@/components/page-content/macroEconomic/GlobalSection";
import StockSection from "@/components/page-content/macroEconomic/StockSection";
import Footer from "@/components/footer/Footer";

const useMacroEconomicStyles = makeStyles((theme) => ({
    container: {

    },
    content: {
        minHeight: "calc(100vh - 118px)",
        padding: theme.spacing(4, 6)
    }
}));

const MacroEconomic = () => {
    const classes = useMacroEconomicStyles();

    return (
        <div className={classes.container}>
            <NavigationBar />
            <div className={classes.content}>
                <GlobalSection />
                <StockSection />
            </div>
            <Footer />
        </div>
    )
};

export default MacroEconomic;