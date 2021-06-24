import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";

import NavigationBar from "@/components/navBar/NavigationBar";
import PriceNewsSection from "@/components/page-content/stockDetail/PriceNewsSection";
import Footer from "@/components/footer/Footer";
import StatusImg from "@/components/table/StatusImg";

import {
    getYearlyPriceVolumn
} from "@/api/stock";


const useStockDetailStyles = makeStyles((theme) => ({
    container: {

    },
    content: {
        minHeight: "calc(100vh - 118px)",
        padding: theme.spacing(4, 6)
    }
}));

const stockDetail = () => {
    const classes = useStockDetailStyles();

    const router = useRouter();

    const stockId = router.query.stockId;

    const [priceVolumnData, setPriceVolumnData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchYearlyPriceVolumn = async () => {
        setIsLoading(true);
        const postData = {
            body: {
                stockId
            }
        };

        const res = await getYearlyPriceVolumn(postData);

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        setPriceVolumnData(res.data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!stockId) return

        fetchYearlyPriceVolumn()
    }, [stockId]);

    if (isLoading) {
        return (
            <StatusImg type="loading" word="Data is loading" />
        )
    }

    return (
        <div className={classes.container}>
            <NavigationBar />
            <div className={classes.content}>
                <PriceNewsSection
                    priceVolumnData={priceVolumnData}
                    stockName={"stockName"}
                />
            </div>
            <Footer />
        </div>
    )
};

export default stockDetail;