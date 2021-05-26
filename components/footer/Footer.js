import { makeStyles } from "@material-ui/core/styles";


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
            Copyright © 2021 Koophio
        </div>
    )
};

export default Footer;