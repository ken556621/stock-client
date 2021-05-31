import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";


const useNoDataStyles = makeStyles(theme => ({
    defaultImgWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    word: {
        marginTop: 20,
        fontSize: 20
    }
}));

const StatusImg = (props) => {
    const {
        customImg = null,
        word = "No Data Found",
        type = "noData",
        width = 220,
        height = 200
    } = props;

    const renderImg = (status) => {
        let img = "";
        switch (status) {
            case "noData":
                img = <img src="/img/no-data.png" style={{ width: width, height: height }} />
                break;
            case "inputData":
                img = <img src="/img/input-data.png" style={{ width: width, height: height }} />
                break;
            case "loading":
                img = <CircularProgress style={{ padding: 20 }} size={100} />
                break;
            default:
                img = <img src="/img/no-data.png" style={{ width: width, height: height }} />
                break;
        }

        return img;
    }

    const classes = useNoDataStyles();

    return (
        <div className={classes.defaultImgWrapper}>
            {
                renderImg(type)
            }
            <div className={classes.word}>
                {word}
            </div>
        </div>
    )
}

export default StatusImg;