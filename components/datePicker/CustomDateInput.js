import { useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import dayjs from "dayjs";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";


const useCustomDateInputStyles = makeStyles(theme => ({
    datePickerSectionWrapper: {
        position: "relative"
    },
    datePickerWrapper: {
        marginTop: 5,
        display: "flex",
        position: "absolute",
        left: -100,
        zIndex: 100,
        "&:hover .react-datepicker": {
            boxShadow: "none"
        },
        "&:hover $paperRoot": {
            boxShadow: "none"
        }
    },
    displayDate: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 10,
        padding: "0px 20px",
        height: 37,
        border: "none",
        border: "1px solid #D8D8D8",
        borderRadius: 6,
        minWidth: 298,
        cursor: "pointer",
        color: "#285A99",
        fontSize: 14
    },
    arrow: {
        color: "#ced4da"
    },
    icon: {
        fontSize: 14
    },
    header: {
        marginBottom: 9,
        padding: "9px 0px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #cecece",
        borderBottomWidth: "80%"
    },
    monthWord: {
        display: "flex",
        alignItems: "center",
        color: "#0a2f5c",
        fontSize: 15,
        fontWeight: "bold"
    },
    arrowButton: {
        minWidth: 20,
        padding: 0,
        "&:hover": {
            backgroundColor: "#ffffff"
        },
    },
    myContainerRoot: {
        display: "flex"
    },
    paperRoot: {
        minHeight: 281,
        boxShadow: "0 0 14px 0 rgba(137, 174, 255, 0.2)",
        "&:hover": {
            zIndex: 1000,
            boxShadow: "0 0 14px 0 rgba(137, 174, 255, 0.2) !important"
        }
    },
    listRoot: {
        marginTop: 40,
        width: 130,
        color: "#285a99",
        textTransform: "capitalize",
        "& .MuiButtonBase-root": {
            padding: "0px 0px 6px 20px"
        }
    },
    btnWrapper: {
        marginLeft: 90
    },
    submitBtn: {
        minWidth: 0,
        marginLeft: 5,
        color: "#ffffff",
        backgroundColor: "#285a99",
        fontSize: 14,
        "&:hover": {
            color: "#ffffff",
            backgroundColor: "#1d4d8a"
        }
    },
    closeBtn: {
        minWidth: 0,
        color: "#285a99",
        backgroundColor: "#ffffff",
        fontSize: 14,
        border: "solid 1px #285a99",
        "&:hover": {
            color: "#285a99",
            backgroundColor: "#f8fbff"
        }
    }
}));

/**
 *
 * @param {Function} props.label 客製化展開前的 component. (startDate, endDate) => {}
 * @returns
 */
const CustomDateInput = (props) => {
    const currentDate = new Date();

    const {
        classes = {},
        updateSelectedDate = null,
        defaultStartDate = dayjs().subtract(1, "m").$d, // 預設一個月前
        defaultEndDate = dayjs().subtract(1, "d").$d,
        customContainer = null,
        label = null,
        ...others
    } = props;

    let customClasses = useCustomDateInputStyles();

    customClasses = {
        ...customClasses,
        datePickerSectionWrapper: clsx(customClasses.datePickerSectionWrapper, classes.datePickerSectionWrapper),
        datePickerWrapper: clsx(customClasses.datePickerWrapper, classes.datePickerWrapper)
    }

    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [open, setOpen] = useState(false);

    const optionSchema = [
        {
            value: "today",
            label: "Today",
            startDate: currentDate,
            endDate: currentDate
        },
        {
            value: "last30days",
            label: "Last 30 days",
            startDate: dayjs().subtract(30, "d").$d,
            endDate: dayjs().subtract(1, "d").$d
        },
        {
            value: "last6months",
            label: "Last 6 months",
            startDate: dayjs().subtract(6, "m").$d,
            endDate: dayjs().subtract(1, "d").$d
        },
        {
            value: "last1year",
            label: "Last 1 year",
            startDate: dayjs().subtract(1, "y").$d,
            endDate: dayjs().subtract(1, "d").$d
        },
        {
            value: "last5year",
            label: "Last 5 year",
            startDate: dayjs().subtract(5, "y").$d,
            endDate: dayjs().subtract(1, "d").$d
        }
    ];

    const onChange = dates => {
        const [start, end] = dates;

        setStartDate(start);
        setEndDate(end);
    };

    const handleDatePickerOpen = () => {
        setOpen(!open)
    }

    const handleDatePickerClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        const updateInfo = {
            startDate: formatToBackend(startDate),
            endDate: formatToBackend(endDate)
        }

        updateSelectedDate(updateInfo);
        setOpen(false);
    }

    const handleRangeClick = (option) => {
        setStartDate(option.startDate);
        setEndDate(option.endDate);
    }

    const formatDate = (date, isExcludedMonth) => {
        if (!date) {
            return dayjs().format("DD MMM YYYY");
        }

        if (isExcludedMonth) {
            return dayjs(date).format("MMM YYYY");
        }

        return dayjs(date).format("DD MMM YYYY");
    }

    const formatToBackend = (date) => {
        return dayjs(date).format("YYYY-MM-DD");
    }

    const CustomHeader = props => {
        const {
            date,
            decreaseYear,
            prevYearButtonDisabled,
            increaseYear,
            nextYearButtonDisabled,
            decreaseMonth,
            prevMonthButtonDisabled,
            increaseMonth,
            nextMonthButtonDisabled
        } = props;

        return (
            <div className={customClasses.header}>
                <div className={customClasses.iconBtnWrapper}>
                    <IconButton
                        onClick={decreaseYear}
                        disabled={prevYearButtonDisabled}
                        className={customClasses.arrowButton}
                    >
                        <img src="/icons/double_angle_left.svg" />
                    </IconButton>
                    <IconButton
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className={customClasses.arrowButton}
                    >
                        <img src="/icons/angle_left.svg" />
                    </IconButton>
                </div>
                <div className={customClasses.monthWord}>
                    {formatDate(date, true)}
                </div>
                <div className={customClasses.iconBtnWrapper}>
                    <IconButton
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className={customClasses.arrowButton}
                    >
                        <img src="/icons/angle_right.svg" />
                    </IconButton>
                    <IconButton
                        onClick={increaseYear}
                        disabled={nextYearButtonDisabled}
                        className={customClasses.arrowButton}
                    >
                        <img src="/icons/double_angle_right.svg" />
                    </IconButton>
                </div>
            </div>
        )
    }

    const MyContainer = ({ className, children }) => {
        return (
            <div className={customClasses.myContainerRoot}>
                <CalendarContainer className={className}>
                    <div style={{ position: "relative" }}>
                        {children}
                        <div className={customClasses.btnWrapper}>
                            <Button
                                className={customClasses.closeBtn}
                                color="primary"
                                onClick={handleDatePickerClose}
                                disableElevation
                            >
                                Cancel
                            </Button>
                            <Button
                                className={customClasses.submitBtn}
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disableElevation
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </CalendarContainer>
                {
                    customContainer ?? (<DateRangePicker />)
                }
            </div>
        );
    };

    const CustomDatePicker = () => {
        if (!open) return <></>
        return (
            <div className={customClasses.datePickerWrapper}>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    renderCustomHeader={CustomHeader}
                    calendarContainer={MyContainer}
                    {...others}
                />
            </div>
        )
    }

    const DateRangePicker = () => {
        return (
            <Paper
                classes={{
                    root: customClasses.paperRoot
                }}
            >
                <List
                    classes={{
                        root: customClasses.listRoot
                    }}
                    dense
                    disablePadding
                >
                    {
                        optionSchema.map(option => (
                            <ListItem
                                dense
                                button
                                onClick={() => handleRangeClick(option)}
                            >
                                <ListItemText primary={option.label} />
                            </ListItem>
                        ))
                    }
                </List>
            </Paper>
        )
    }

    const renderCustomLabel = () => {
        if (label) return label(startDate, endDate);

        return (
            <div className={customClasses.displayDate}>
                <CalendarTodayIcon
                    className={customClasses.icon}
                />
                {formatDate(startDate)}
                <div className={customClasses.arrow}>
                    →
                </div>
                {formatDate(endDate)}
            </div>
        )
    }

    return (
        <ClickAwayListener onClickAway={() => handleDatePickerClose()}>
            <div className={customClasses.datePickerSectionWrapper}>
                <div onClick={handleDatePickerOpen}>
                    {renderCustomLabel()}
                </div>
                <CustomDatePicker />
            </div>
        </ClickAwayListener>
    )
}

export default CustomDateInput;