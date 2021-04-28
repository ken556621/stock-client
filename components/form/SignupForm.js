import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';


const useLoginFormStyles = makeStyles((theme) => ({
    formWrapper: {
        width: "50vw",
        maxWidth: 450,
        padding: 30,
        borderRadius: 8,
        boxShadow: "0 0 1.5rem #e6e6e6",
        backgroundColor: "#fafafa",
        fontSize: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    error: {
        color: theme.palette.error.main
    },
    submitBtnRoot: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const router = useRouter();

    const classes = useLoginFormStyles();

    const handleClickLoginBtn = () => {
        router.push("/authorization/login")
    }

    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <div className={classes.formWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormControl
                    fullWidth
                    margin="normal"
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
                        {...register("email", { required: true })}
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        }
                    />
                    {errors.email && <span className={classes.error}>Email is required</span>}
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                >
                    <InputLabel htmlFor="email">
                        Name
                    </InputLabel>
                    <Input
                        id="name"
                        type="name"
                        name="name"
                        placeholder="Please Type Name"
                        autoFocus
                        {...register("name", { required: true })}
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        }
                    />
                    {errors.name && <span className={classes.error}>Name is required</span>}
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                >
                    <InputLabel htmlFor="email">
                        Password
                    </InputLabel>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Please Type Password"
                        autoFocus
                        {...register("password", { required: true })}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        }
                    />
                    {errors.password && <span className={classes.error}>Password is required</span>}
                </FormControl>
                <div className={classes.submitBtnRoot}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickLoginBtn}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Signup
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default SignupForm;