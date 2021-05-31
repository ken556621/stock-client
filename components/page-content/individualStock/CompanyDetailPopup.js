import { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";

import {
    getCompanyDetail
} from "@/api/individualStock";


const useCompanyDetailPopupStyles = makeStyles((theme) => ({
    container: {

    }
}));

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

        setCompanyInfo(res.data)
    };

    const handleClose = () => {
        setAnchorEl(null);
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

    console.log(companyInfo)

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
                Company Content
            </Popover>
        </div>
    )
};

export default CompanyDetailPopup;