import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import {
    setUserSelected
} from "@/redux/actions/user";



const useNavigationBarStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "#343a40",
        padding: theme.spacing(4)
    },
    tab: {
        color: "#ffffff80",
        cursor: "pointer",
        fontSize: ".8125rem",
        "&:not(&:last-of-type)": {
            marginRight: theme.spacing(2)
        }
    },
    selected: {
        color: "#fff"
    }
}));

const NavigationBar = () => {
    const classes = useNavigationBarStyles();

    const dispatch = useDispatch();

    const { userSelectedType } = useSelector(state => state.user);

    const navigationBarSchema = [
        {
            title: "總體經濟",
            value: "macroEconomics"
        },
        {
            title: "類股",
            value: "industrialStock"
        },
        {
            title: "個股",
            value: "individualStock"
        }
    ];

    const handleClickNav = (type) => {
        dispatch(setUserSelected(type))
    };

    const renderNavBar = () => {
        return navigationBarSchema.map(item => (
            <div
                key={item.value}
                className={clsx(classes.tab, {
                    [classes.selected]: userSelectedType === item.value
                })}
                onClick={() => handleClickNav(item.value)}
            >
                {item.title}
            </div>
        ))
    };

    return (
        <div className={classes.container}>
            {renderNavBar()}
        </div>
    )
};

export default NavigationBar;