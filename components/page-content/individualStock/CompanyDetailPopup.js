import { useEffect, useState } from "react";

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

import {
    getCompanyDetail
} from "@/api/individualStock";


const useCompanyDetailPopupStyles = makeStyles((theme) => ({
    container: {

    },
    itemWordWrapper: {
        minWidth: 300,
        display: "flex"
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
        stockId = ""
    } = props;

    const classes = useCompanyDetailPopupStyles();

    const [companyInfo, setCompanyInfo] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCompanyDetail = async () => {
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
                            <div className={classes.word}>
                                {companyInfo[item]}
                            </div>
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
        <div className={classes.container}>
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
                    <List dense={true}>
                        <CustomListItem />
                    </List>
                </div>
            </Popover>
        </div>
    )
};

export default CompanyDetailPopup;