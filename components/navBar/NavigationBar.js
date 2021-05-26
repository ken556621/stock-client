
import { makeStyles } from "@material-ui/core/styles";



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
    }
}));

const NavigationBar = () => {
    const classes = useNavigationBarStyles();

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
        console.log(type)
    };

    const renderNavBar = () => {
        return navigationBarSchema.map(item => (
            <div
                key={item.value}
                className={classes.tab}
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