import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ArtTrackIcon from '@material-ui/icons/ArtTrack';

import CustomSelect from "@/components/searchInput/CustomSelect";

import {
    getIndustryVolumn
} from "@/api/individualStock";

import {
    industrySchema
} from "@/helper/format";


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

    const [targetIndustry, setTargetIndustry] = useState("水泥");
    const [isLoading, setIsLoading] = useState(false);

    const formatDropdownList = (data) => {
        return data.map(item => {
            return {
                value: item,
                label: item
            }
        })
    };

    const handleEditDone = (event) => {
        const value = event.target.value;

        setTargetIndustry(value)
    };

    return (
        <div className={classes.container}>
            <div className={classes.titleWrapper}>
                <div className={classes.title}>
                    <ArtTrackIcon className={classes.icon} />
                    <div className={classes.titleWord}>
                        類股組成
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
        </div>
    )
};

export default IndustryListSection;