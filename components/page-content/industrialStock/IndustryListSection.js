import { useState, useEffect } from "react";
import uniqBy from "lodash/uniqBy";

import { makeStyles } from "@material-ui/core/styles";
import ArtTrackIcon from '@material-ui/icons/ArtTrack';

import CustomSelect from "@/components/searchInput/CustomSelect";
import CustomTreemap from "@/components/charts/CustomTreemap";

import {
    getAllIndustryList,
    getAllGrossMargin
} from "@/api/individualStock";

import {
    industrySchema
} from "@/helper/stockSchema";


const useIndustryListSectionStyles = makeStyles((theme) => ({
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

const IndustryListSection = () => {
    const classes = useIndustryListSectionStyles();

    const [allGrossMargin, setAllGrossMargin] = useState([]);
    const [allIndustryList, setAllIndustryList] = useState([]);
    const [targetIndustry, setTargetIndustry] = useState("01");
    const [isLoading, setIsLoading] = useState(false);


    const fetchAllIndustryList = async () => {
        setIsLoading(true);
        const postData = {
            body: {
                industryId: targetIndustry
            }
        };

        const res = await getAllIndustryList(postData);

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        setIsLoading(false);
        setAllIndustryList(res.data);
    };

    const fetchAllGrossMargin = async () => {
        setIsLoading(true);
        const res = await getAllGrossMargin();

        if (!res.isSuccess) {
            setIsLoading(false);
            return
        }

        setIsLoading(false);
        setAllGrossMargin(res.data);
    };

    const formatDropdownList = (data) => {
        return data.map((item, index) => {
            return {
                value: (index + 1) < 10 ? "0" + (index + 1) : String(index + 1),
                label: item
            }
        })
    };

    const handleEditDone = (event) => {
        const value = event.target.value;

        setTargetIndustry(value)
    };

    const filterTargetStock = () => {
        return allGrossMargin.filter(({ stockNo }) => allIndustryList.some(({ stockId }) => stockNo === stockId))
    };

    const formatTreemapData = (data) => {
        let result = [];

        data.map(item => {
            allIndustryList.forEach(industry => {
                if (industry.stockId === item.stockNo) {
                    result.push({
                        stockId: item.stockNo,
                        name: industry.stockName,
                        grossMargin: Number(((item.grossProfit / item.revenue) * 100).toFixed(2))
                    })
                }
            })
        })

        return result
    };

    const uniqTwoSeasonGrossProfit = (data) => {
        return uniqBy(data, ele => {
            return ele.stockNo
        })
    };

    useEffect(() => {
        fetchAllIndustryList()
    }, [targetIndustry])

    useEffect(() => {
        fetchAllGrossMargin()
    }, [])

    const filterTreemapData = formatTreemapData(uniqTwoSeasonGrossProfit(filterTargetStock()));

    return (
        <div className={classes.container}>
            <div className={classes.titleWrapper}>
                <div className={classes.title}>
                    <ArtTrackIcon className={classes.icon} />
                    <div className={classes.titleWord}>
                        類股組成(依最近一季毛利率排名)
                </div>
                </div>
                <CustomSelect
                    classes={{
                        root: classes.dropdownRoot,
                        inputRoot: classes.customSelectInputRoot,
                        selected: classes.statusSelected
                    }}
                    // renderValue={renderValue}
                    selected={targetIndustry}
                    list={formatDropdownList(industrySchema)}
                    onChange={handleEditDone}
                />
            </div>
            <CustomTreemap
                data={filterTreemapData}
                dataKey="grossMargin"
            />
        </div>
    )
};

export default IndustryListSection;