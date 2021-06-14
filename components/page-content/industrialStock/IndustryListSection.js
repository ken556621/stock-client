import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqBy from "lodash/uniqBy";

import { makeStyles } from "@material-ui/core/styles";
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import CustomSelect from "@/components/searchInput/CustomSelect";
import CustomTreemap from "@/components/charts/CustomTreemap";
import IndustryCompositionBar from "@/components/charts/IndustryCompositionBar";

import {
    getAllIndustryList
} from "@/api/stock";

import {
    industrySchema
} from "@/helper/stockSchema";

import {
    reqAllStockInfoAction
} from "@/redux/actions/stock";


const matrixSchema = [
    {
        label: "毛利率",
        value: "grossMargin"
    },
    {
        label: "營益率",
        value: "operatingMargin"
    },
    {
        label: "淨利率",
        value: "netInterestRate"
    },
    {
        label: "本益比",
        value: "priceToEarningRatio"
    }
];

const useIndustryListSectionStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4, 6),
        boxShadow: "0px 2px 14px 0 rgb(69 20 229 / 10%)",
        borderRadius: 15,
        minHeight: 300
    },
    titleAndSelectWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing(6),
        "&:not(&:first-of-type)": {
            margin: theme.spacing(6, 0)
        }
    },
    dropdownRoot: {
        width: 200,
        marginRight: theme.spacing(4)
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
    titleWrapper: {
        display: "flex",
        alignItems: "center"
    },
    selectWrapper: {
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
    },
    label: {
        fontSize: ".5rem",
        color: "#1a1919"
    }
}));

const IndustryListSection = () => {
    const dispatch = useDispatch();

    const { allStockInfo } = useSelector(state => state.stock);

    const classes = useIndustryListSectionStyles();

    const [allIndustryList, setAllIndustryList] = useState([]);
    const [targetIndustry, setTargetIndustry] = useState("01");

    const [tabIndex, setTabIndex] = useState(2);
    const [isShowFirstData, setIsShowFirstData] = useState(true);
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

    const formatDropdownList = (data) => {
        return data.map((item, index) => {
            return {
                value: item.value,
                label: item.name
            }
        })
    };

    const handleEditDone = (event) => {
        const value = event.target.value;

        setTargetIndustry(value)
    };

    const filterTargetStock = () => {
        return allStockInfo.filter(({ stockNo }) => allIndustryList.some(({ stockId }) => stockNo === stockId))
    };

    const formatTreemapData = (data) => {
        let result = [];

        data.map(item => {
            allIndustryList.forEach(industry => {
                if (industry.stockId === item.stockNo) {
                    result.push({
                        ...item,
                        stockId: item.stockNo,
                        name: industry.stockName,
                        grossMargin: Number(((item.grossProfit / item.revenue) * 100).toFixed(2)),
                        netInterestRate: Number((item.nopat / item.revenue * 100).toFixed(2)),
                        operatingMargin: Number((item.netOperatingProfit / item.revenue * 100).toFixed(2))
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

    const handleChangeTab = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleSwitchBtnChange = () => {
        setIsShowFirstData(!isShowFirstData)
    };

    useEffect(() => {
        fetchAllIndustryList()
    }, [targetIndustry])

    useEffect(() => {
        dispatch(reqAllStockInfoAction())
    }, [])

    const SwitchBtn = () => {
        return filterTreemapData.length > 10 && (
            <FormControlLabel
                classes={{
                    label: classes.label
                }}
                control={
                    <Switch
                        color="primary"
                        checked={isShowFirstData}
                        onChange={handleSwitchBtnChange}
                    />
                }
                label={
                    <>
                        <div>
                            On: 前 1/3 資料
                        </div>
                        <div>
                            Off: 後 2/3 資料
                        </div>
                        <div>
                            (照本益比排序)
                        </div>
                    </>
                }
                labelPlacement="end"
            />
        )
    };

    const CustomTabs = () => {
        return (
            <Tabs
                value={tabIndex}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChangeTab}
            >
                {
                    matrixSchema.map(tab => (
                        <Tab label={tab.label} />
                    ))
                }
            </Tabs>
        )
    };

    const filterTreemapData = formatTreemapData(uniqTwoSeasonGrossProfit(filterTargetStock()));

    return (
        <div className={classes.container}>
            <div className={classes.titleAndSelectWrapper}>
                <div className={classes.titleWrapper}>
                    <BarChartIcon className={classes.icon} />
                    <div className={classes.titleWord}>
                        類股組成
                    </div>
                    <span>
                        (基本面合併比較)
                    </span>
                </div>
                <div className={classes.selectWrapper}>
                    <CustomSelect
                        classes={{
                            root: classes.dropdownRoot,
                            inputRoot: classes.customSelectInputRoot,
                            selected: classes.statusSelected
                        }}
                        selected={targetIndustry}
                        list={formatDropdownList(industrySchema)}
                        onChange={handleEditDone}
                    />
                    <SwitchBtn />
                </div>
            </div>
            <IndustryCompositionBar
                data={filterTreemapData}
                matrixSchema={matrixSchema}
                isShowFirstData={isShowFirstData}
            />
            <div className={classes.titleAndSelectWrapper}>
                <div className={classes.titleWrapper}>
                    <DashboardIcon className={classes.icon} />
                    <div className={classes.titleWord}>
                        類股組成
                    </div>
                    <span>
                        (基本面分別比較)
                    </span>
                </div>
                <div className={classes.selectWrapper}>
                    <CustomTabs />
                </div>
            </div>
            <CustomTreemap
                data={filterTreemapData}
                dataKey={matrixSchema[tabIndex].value}
            />
        </div>
    )
};

export default IndustryListSection;