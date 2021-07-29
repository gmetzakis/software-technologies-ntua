import React from "react";
import clsx from 'clsx';
import axios from 'axios';
import { useHistory, Redirect } from "react-router-dom";
import {
    makeStyles,
    Button,
    Grid,
    Paper,
    Snackbar,
    FormControl,
    Input,
    InputLabel,
    InputAdornment,
    IconButton
} from "@material-ui/core";
import Alert from "./Alert";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {useAuth} from '../context/authentication';
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 100
    },
    field: {
        width: '35ch',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    paper: {
        padding: 30,
        margin: 10
    },
    button: {
        textTransform: 'none'
    }
}));



export default function Login() {

    const classes = useStyles();

    const [authBody, setAuthBody] = React.useState(
        {
            username: '',
            password: ''
        }
    );

    const { setAuthToken } = useAuth();

    const [showPassword, setShowPassword] = React.useState(false);

    const [snackBarState, setSnackBarState] = React.useState(false);

    const [alertMessage, setAlertMessage] = React.useState('');

    const [alertType, setAlertType] = React.useState('');

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const changeHandler = event => {
        setAuthBody({ ...authBody, [event.target.name]: event.target.value });
    }

    const submitHandler = event => {

        event.preventDefault();
        var querystring = require('querystring');

        axios.post('http://localhost:8765/evcharge/api/login',
            querystring.stringify({
                username: authBody.username,
                password: authBody.password
            }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => {
            if (response.data.success === true) {

                setIsAuthenticated(true);
                setAlertType('success');
                setAlertMessage(response.data.message);
                setSnackBarState(true);

                setAuthToken(response.data.token);
            }
        }).catch(error => {
                setAlertType('error');
                setAlertMessage('Authentication failed - '+error.response.data.message);
                setSnackBarState(true);
        });
    }

    const closeAlertHandler = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setSnackBarState(false);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    if (isAuthenticated) {
        return <Redirect to={'/sessions'} />;
    }

    return (
        <div>
            <NavBar />
            <Snackbar open={snackBarState} autoHideDuration={6000} onClose={closeAlertHandler}>
                <Alert severity={alertType} onClose={closeAlertHandler}>
                    {alertMessage}
                </Alert>
            </Snackbar>


            <div className={classes.root}>


                <form autoComplete="off" onSubmit={submitHandler}>
                    <Grid container alignItems="center" justify="center" direction="column" >

                        <Paper elevation={6} className={classes.paper}>
                            <Grid item key="1" >

                                <FormControl margin="normal" className={classes.field}>
                                    <InputLabel htmlFor="username">Username</InputLabel>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={authBody.username}
                                        onChange={changeHandler}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item key="2">

                                <FormControl margin="normal" className={classes.field}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={authBody.password}
                                        onChange={changeHandler}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                            </Grid>
                        </Paper>

                        <Grid item key="3">
                            <Button
                                className={clsx(classes.button, classes.field)}
                                color="primary"
                                variant="contained"
                                type="submit"
                                onSubmit={submitHandler}>
                                Log in
                        </Button>
                        </Grid>

                    </Grid>
                </form>

            </div>
        </div>
    );
}