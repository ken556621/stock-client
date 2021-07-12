import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";

import NavigationBar from "@/components/navBar/NavigationBar";
import PriceNewsSection from "@/components/page-content/stockDetail/PriceNewsSection";
import Footer from "@/components/footer/Footer";
import StatusImg from "@/components/table/StatusImg";

import {
    getIndividualStockNews,
    getStockName
} from "@/api/stock";


const useStockDetailStyles = makeStyles((theme) => ({
    container: {

    },
    content: {
        minHeight: "calc(100vh - 156px)",
        padding: theme.spacing(4, 6),
        position: "relative"
    }
}));

const stockDetail = () => {
    const classes = useStockDetailStyles();

    const router = useRouter();

    const stockId = router.query.stockId;

    const [stockNews, setStockNews] = useState([]);

    const [stockName, setStockName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchStockName = async () => {
        setIsLoading(true);
        const postData = {
            body: {
                stockId
            }
        };

        const res = await getStockName(postData);

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        const taiwanStock = res.data.filter(item => item.exchDisp === "台灣");

        setStockName(taiwanStock[0].name);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!stockId) return

        fetchStockName();
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
                    stockNews={stockNews}
                    stockName={stockName}
                />
            </div>
            <Footer />
        </div>
    )
};

export default stockDetail;