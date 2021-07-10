import { makeStyles } from "@material-ui/core/styles";

import dayjs from "dayjs";


const useFooterStyles = makeStyles((theme) => ({
    footerWrapper: {
        padding: theme.spacing(4),
        textAlign: "center",
        backgroundColor: "#343a40",
        color: "#fff"
    }
}));

const Footer = () => {
    const classes = useFooterStyles();

    return (
        <div>
            {/* <marquee direction="right" scrolldelay="60" class="position-absolute">
                <img src="https://akstatic.streetvoice.com/asset/images/sv-cat.gif" width="20" height="28" border="0" />
            </marquee> */}
            <div className={classes.footerWrapper}>
                {`Copyright © ${dayjs().year()} Koophio`}
            </div>
        </div>
    )
};

export default Footer;