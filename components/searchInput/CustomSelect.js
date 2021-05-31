import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import clsx from "clsx";

const useMultipleSelectStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    empty: {
        color: "#909090"
    },
    selected: {
        color: "#285a99"
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        fontWeight: "bold",
        color: "#0a2f5c"
    },
    error: {
        color: "#f11d4c"
    },
    menuRoot: {
        maxHeight: 200,
        boxShadow: "0 0 14px 0 rgba(137, 174, 255, 0.2)"
    },
    menuList: {
        padding: 0
    },
    menuItem: {
        "&:hover": {
            backgroundColor: "#f8fbff"
        },
        "&.Mui-selected": {
            backgroundColor: "#eef5ff"
        }
    }
}));
const useOutlinedInputStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        lineHeight: 1,
        padding: 0,
        fontSize: 14,
        borderRadius: 6,
        overflow: "hidden",
        "& .MuiInputBase-input": {
            padding: 10,
            "&:focus": {
                backgroundColor: "inherit"
            }
        },
        "&:hover $notchedOutline": {
            borderColor: "#5d799c"
        },
        "&$focused $notchedOutline": {
            borderColor: "#5d799c",
            borderWidth: 1
        },
        "&$disabled $notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.26)",
            borderWidth: 1
        }
    },
    focused: {},
    disabled: {},
    notchedOutline: {
        borderColor: "#5d799c"
    }
}));
const useSelectClassesStyles = makeStyles((theme) => ({
    select: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        color: "#5d799c"
    }
}));
/**
 *
 * @example props.renderChildren
    (itemData) => ({
        <MenuItem key={itemData.value} value={itemData.value}>
            {itemData.label}
        </MenuItem>
    })
 */
const CustomSelect = (props) => {
    const {
        classes = {},
        label = "",
        placeholder = "",
        multiple = false,
        list = [
            {
                value: 0,
                label: "label 0"
            },
            {
                value: 1,
                label: "label 1"
            },
            {
                value: 2,
                label: "label 2"
            }
        ],
        selected = [],
        MenuProps = {},
        onClose = null,
        error = false,
        helperText = null,
        renderChildren = null,
        ...others
    } = props;

    let customer = useMultipleSelectStyles();
    let outlinedInputClasses = useOutlinedInputStyles();
    let selectClasses = useSelectClassesStyles();

    customer = {
        ...customer,
        root: clsx(customer.root, classes.root),
        selected: clsx(customer.selected, classes.selected),
        label: clsx(customer.label, classes.label),
        menuRoot: clsx(customer.menuRoot, classes.menuRoot),
        menuList: clsx(customer.menuList, classes.menuList)
    };
    outlinedInputClasses = {
        ...outlinedInputClasses,
        root: clsx(outlinedInputClasses.root, classes.inputRoot),
        notchedOutline: clsx(outlinedInputClasses.notchedOutline, classes.notchedOutline)
    };
    selectClasses = {
        ...selectClasses,
        icon: clsx(selectClasses.icon, classes.icon),
        select: clsx(selectClasses.select, classes.select)
    };

    const customMenuProps = {
        getContentAnchorEl: null,
        classes: {
            paper: customer.menuRoot,
            list: customer.menuList
        },
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        },
        ...MenuProps
    };

    const customRenderValue = (selectedId) => {
        if (multiple) {
            if (!selectedId?.length)
                return (
                    <span className={customer.selected}>
                        {placeholder || "Multiple options"}
                    </span>
                );

            if (selectedId.length === 1)
                return (
                    <span className={customer.selected}>
                        {list.find((item) => item.value === selectedId[0])?.label}
                    </span>
                );

            if (selectedId.length === list.length)
                return <span className={customer.selected}>Selected All</span>;
        }
        if (!multiple) {
            if (typeof selectedId === "number" || selectedId?.length) {
                return (
                    <span className={customer.selected}>
                        {list.find((item) => item.value === selectedId)?.label}
                    </span>
                );
            }
            return (
                <span className={customer.empty}>
                    {placeholder || "Select options"}
                </span>
            );
        }
    };

    const customRenderChildren = renderChildren
        ? renderChildren
        : (itemData) => (
            <MenuItem
                key={itemData.value}
                value={itemData.value}
                classes={{ root: customer.menuItem }}
            >
                {itemData.label}
            </MenuItem>
        );

    return (
        <FormControl classes={{ root: customer.root }}>
            {label && (
                <span
                    className={clsx(customer.label, {
                        [customer.error]: error
                    })}
                >
                    {label}
                </span>
            )}
            <Select
                classes={selectClasses}
                value={selected}
                onClose={onClose}
                multiple={multiple}
                displayEmpty
                input={<OutlinedInput classes={outlinedInputClasses} error={error} />}
                MenuProps={customMenuProps}
                renderValue={customRenderValue}
                {...others}
            >
                {list.map(customRenderChildren)}
            </Select>
            {error ? (
                <FormHelperText error={error}>{helperText}</FormHelperText>
            ) : null}
        </FormControl>
    );
};

export default CustomSelect;
