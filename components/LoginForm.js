import { useForm } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Icon from "@material-ui/core/Icon";



const useLoginFormStyles = makeStyles((theme) => ({
    formWrapper: {
        width: 100,
        maxWidth: 450,
        borderRadius: 1,
        boxShadow: "0 0 1.5rem #e6e6e6",
        backgroundColor: "#fafafa"
    }
}));

const LoginForm = () => {
    const { register, handleSubmit, errors } = useForm({
        mode: "onChange"
    });

    const classes = useLoginFormStyles();

    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <div className={classes.formWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormControl
                    fullWidth
                    required
                    margin="normal"
                // error={emailError}
                >
                    <InputLabel htmlFor="email">
                        Email
                    </InputLabel>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Please Type Email"
                        autoFocus
                        startAdornment={
                            <InputAdornment position="start">
                                <Icon>email</Icon>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </form>
        </div>
    )
};

export default LoginForm;