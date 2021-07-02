import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ApartmentIcon from '@material-ui/icons/Apartment';
import EventIcon from '@material-ui/icons/Event';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PieChartIcon from '@material-ui/icons/PieChart';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PlaceIcon from '@material-ui/icons/Place';

import MiniLine from "@/components/charts/MiniLine";
import StatusImg from "@/components/table/StatusImg";

import {
    getCompanyDetail
} from "@/api/stock";

import {
    industryToPostId
} from "@/helper/format";


const useCompanyDetailPopupStyles = makeStyles((theme) => ({
    itemWordWrapper: {
        minWidth: 300,
        display: "flex"
    },
    content: {
        position: "relative",
        minWidth: 500
    },
    chartWrapper: {
        position: "absolute",
        top: "5%",
        right: "10%",
        width: 150
    },
    chartTitle: {
        marginBottom: theme.spacing(4),
        color: "#0a2f5c"
    },
    icon: {
        marginRight: theme.spacing(2),
        color: "#0a2f5c"
    },
    category: {
        marginRight: theme.spacing(2),
        wordBreak: "keep-all",
        color: "#0a2f5c"
    },
    industryTitle: {
        cursor: "pointer",
        color: "#285a99",
        borderRadius: 4,
        padding: theme.spacing(0, 2),
        "&:hover": {
            backgroundColor: "#eee"
        }
    },
    word: {
        color: "#285a99"
    }
}));

const categorySchema = [
    {
        title: "產業別",
        icon: <ApartmentIcon />
    },
    {
        title: "成立時間",
        icon: <EventIcon />
    },
    {
        title: "上市櫃時間",
        icon: <TrendingUpIcon />
    },
    {
        title: "股本",
        icon: <ReceiptIcon />
    },
    {
        title: "營收比重",
        icon: <PieChartIcon />
    },
    {
        title: "工廠",
        icon: <PlaceIcon />
    }
];

const CompanyDetailPopup = (props) => {
    const {
        stockId = "",
        handleClosePopup = null
    } = props;

    const router = useRouter();

    const classes = useCompanyDetailPopupStyles();

    const [companyInfo, setCompanyInfo] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCompanyDetail = async () => {
        setIsLoading(true);
        const postData = {
            body: {
                stockId
            }
        };

        const res = await getCompanyDetail(postData);

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        setCompanyInfo(res.data);
        setIsLoading(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
        handleClosePopup && handleClosePopup()
    };

    const handleClickIndustryTitle = (value) => {
        const industryId = industryToPostId(value);
        router.push(`/overview/industrialStock?industryId=${industryId}`)
    };

    const renderIndustryTitle = (item, index) => {
        if (categorySchema[index]?.title === "產業別") {
            return (
                <div
                    className={classes.industryTitle}
                    onClick={() => handleClickIndustryTitle(companyInfo[item])}
                >
                    {companyInfo[item].trim() || "暫無資料"}
                </div>
            )
        };

        return (
            <div className={classes.word}>
                {companyInfo[item].trim() || "暫無資料"}
            </div>
        )
    };

    const CustomListItem = () => {
        if (isLoading) return (
            <StatusImg
                type="loading"
                word="Data is loading"
            />
        )

        return Object.keys(companyInfo).map((item, index) => (
            <ListItem>
                <ListItemText
                    primary={
                        <div className={classes.itemWordWrapper}>
                            <div className={classes.icon}>
                                {categorySchema[index].icon}
                            </div>
                            <div className={classes.category}>
                                {categorySchema[index].title + ":"}
                            </div>
                            {renderIndustryTitle(item, index)}
                        </div>
                    }
                />
            </ListItem>
        ))
    };

    useEffect(() => {
        if (!stockId) {
            setAnchorEl(null);
        } else {
            fetchCompanyDetail();
            setAnchorEl(stockId);
        }
    }, [stockId]);

    const open = Boolean(anchorEl);

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <div className={classes.content}>
                <div className={classes.chartWrapper}>
                    <div className={classes.chartTitle}>
                        今年走勢
                    </div>
                    <MiniLine stockId={stockId} />
                </div>
                <List dense={true}>
                    <CustomListItem />
                </List>
            </div>
        </Popover>
    )
};

export default CompanyDetailPopup;