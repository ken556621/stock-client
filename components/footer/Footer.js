import { makeStyles } from "@material-ui/core/styles";

import dayjs from "dayjs";


const useFooterStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        textAlign: "center",
        backgroundColor: "#343a40",
        color: "#fff"
    }
}));

const Footer = () => {
    const classes = useFooterStyles();

    return (
        <div className={classes.container}>
            {`Copyright © ${dayjs().year()} Koophio`}
        </div>
    )
};

export default Footer;