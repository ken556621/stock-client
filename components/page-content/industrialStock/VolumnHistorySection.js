import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ShowChartIcon from '@material-ui/icons/ShowChart';

import CustomSelect from "@/components/searchInput/CustomSelect";
import CustomArea from "@/components/charts/CustomArea";

import {
    getIndustryVolumn
} from "@/api/individualStock";


const useMacroEconomicStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4, 6),
        boxShadow: "0px 2px 14px 0 rgb(69 20 229 / 10%)",
        borderRadius: 15
    },
    titleWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing(4)
    },
    dropdownRoot: {
        width: 200
    },
    customSelectInputRoot: {
        backgroundColor: "#f3f3f3",
        "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &$focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            color: "#3a3a3a"
        },
        "& .MuiSelect-icon": {
            color: "#3a3a3a"
        }
    },
    title: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        marginRight: theme.spacing(2),
        color: "#5585c2"
    },
    titleWord: {
        color: "#1a1919",
        fontSize: "1.125rem",
        "&:before": {
            content: "''",
            height: 30,
            width: 30,
            borderLeft: "1px solid #eee",
            paddingLeft: theme.spacing(2)
        }
    }
}));

const VolumnHistorySection = () => {
    const classes = useMacroEconomicStyles();

    const [industryVolumnList, setIndustryVolumnList] = useState([]);
    const [selectedIndustrailList, setSelectedIndustrailList] = useState([
        "電機機械類指數",
        "半導體類指數",
        "電腦及週邊設備類指數",
        "光電類指數",
        "鋼鐵類指數",
        "電子零組件類指數"
    ]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchIndustryVolumnList = async () => {
        setIsLoading(true);
        const res = await getIndustryVolumn();

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        setIndustryVolumnList(res.data);
        setIsLoading(false);
    };

    const filterUserSelected = (data) => {
        return data.filter(item => selectedIndustrailList.includes(item.name))
    };

    const formatDropdownList = (data) => {
        return data.slice(0, 30).map(item => {
            return {
                value: item.name,
                label: item.name
            }
        })
    };

    const handleEditDone = (event) => {
        const value = event.target.value;

        setSelectedIndustrailList(value)
    };

    const renderValue = (value) => (
        <span className={classes.placeholder}>
            增加類股
        </span>
    );

    useEffect(() => {
        fetchIndustryVolumnList();
    }, [])

    const filterUserSelectedData = filterUserSelected(industryVolumnList);

    return (
        <div className={classes.container}>
            <div className={classes.titleWrapper}>
                <div className={classes.title}>
                    <ShowChartIcon className={classes.icon} />
                    <div className={classes.titleWord}>
                        類股成交量
                    </div>
                </div>
                <CustomSelect
                    classes={{
                        root: classes.dropdownRoot,
                        inputRoot: classes.customSelectInputRoot,
                        selected: classes.statusSelected
                    }}
                    renderValue={renderValue}
                    selected={selectedIndustrailList}
                    list={formatDropdownList(industryVolumnList)}
                    onChange={handleEditDone}
                    multiple={true}
                />
            </div>
            <CustomArea
                data={filterUserSelectedData}
                industrialList={selectedIndustrailList}
                isLoading={isLoading}
            />
        </div>
    )
};

export default VolumnHistorySection;