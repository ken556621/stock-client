import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";

import clsx from "clsx";

const useCustomInputWrapperStyles = makeStyles((theme) => ({
    inputWrap: {
        width: "100%"
    },
    icon: {
        marginRight: 10
    },
    cancelIcon: {

    },
    searchIcon: {

    }
}));
const useCustomLabelStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        width: "100%",
        marginBottom: theme.spacing(1),
        fontSize: 14,
        color: "#0a2f5c",
        transform: "inherit",
        "&.Mui-focused": {
            color: "#0a2f5c"
        }
    },
    error: {
        color: theme.palette.error.main,
        "&.Mui-focused": {
            color: theme.palette.error.main
        }
    },
    disabled: {
        color: "#e9e9e9",
        "&.Mui-focused": {
            color: "#e9e9e9"
        }
    }
}));
const useCustomInputStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        width: 500,
        border: "1px solid",
        borderRadius: 6,
        borderColor: "#d8d8d8"
    },
    input: {
        boxSizing: "border-box",
        minHeight: 35,
        padding: theme.spacing(0, 2),
        fontSize: 14,
        color: "#285a99",
        transition: theme.transitions.create(["border-color"]),
        "&::placeholder": {
            color: "#909090"
        }
    },
    adornedStart: {
        fontSize: 14,
        color: "#285a99",
        transition: theme.transitions.create(["color"]),
        border: "1px solid #5d799c"
    },
    adornedEnd: {
        "& > *:last-child": {
            transition: theme.transitions.create(["color"])
        }
    },
    error: {
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main + " !important",
        "& input": {
            color: theme.palette.error.main + " !important"
        },
        "&$adornedEnd > *": {
            color: theme.palette.error.main + " !important"
        }
    },
    disabled: {
        borderColor: "#e9e9e9",
        background: "#f9f9f9",
        cursor: "not-allowed",
        color: "#e9e9e9"
    }
}));

const SearchBar = (props) => {
    const {
        classes = {},
        label = null,
        helperText = "",
        ...others
    } = props;

    const [keyword, setKeyword] = useState("");

    const baseInputWrapClasses = useCustomInputWrapperStyles();
    const baseInputClasses = useCustomInputStyles();
    const baseLabelClasses = useCustomLabelStyles();
    const inputWrapClasses = {
        ...baseInputWrapClasses,
        root: clsx(baseInputWrapClasses.inputWrap, classes.root)
    };
    const inputClasses = {
        ...baseInputClasses,
        root: clsx(baseInputClasses.root, classes.inputRoot),
        input: clsx(baseInputClasses.input, classes.input),
        focused: clsx(baseInputClasses.focused, classes.focused),
        adornedStart: clsx(baseInputClasses.adornedStart, classes.adornedStart),
        adornedEnd: clsx(baseInputClasses.adornedEnd, classes.adornedEnd)
    };
    const labelClasses = {
        ...baseLabelClasses,
        root: clsx(baseLabelClasses.root, classes.label)
    };

    const status = {
        error: props.error,
        disabled: props.disabled
    };

    const handleClearKeyword = () => {
        setKeyword("");
    };

    const EndAdornment = (props) => {
        if (keyword.length) {
            return (
                <CancelIcon
                    {...props}
                    classes={{ root: baseInputWrapClasses.icon }}
                    onClick={handleClearKeyword}
                />
            )
        } else {
            return (
                <SearchIcon
                    {...props}
                    classes={{ root: baseInputWrapClasses.icon }}
                />
            )
        }
    };

    return (
        <FormControl
            classes={{
                root: inputWrapClasses.root
            }}
        >
            {
                label && (
                    <InputLabel classes={labelClasses} {...status} shrink>
                        {label}
                    </InputLabel>
                )
            }
            <InputBase
                classes={inputClasses}
                endAdornment={<EndAdornment />}
                {...others}
            />
            {
                (status.error && helperText) && (
                    <FormHelperText error>{helperText}</FormHelperText>
                )
            }
        </FormControl>
    );
};

export default SearchBar;