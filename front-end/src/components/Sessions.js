import React from 'react';
import NavBar from "./NavBar";
import DateFnsUtils from '@date-io/date-fns';
import {
    makeStyles,
    FormControl,
    InputLabel,
    Input,
    Box,
    Button,
    Paper
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1
    },
    containerC: {
        paddingLeft: 80,
        paddingRight: 80,
        //width: '80%',
        paddingTop: 40
    },
    containerN: {
        paddingLeft: 80,
        paddingRight: 80,
        //width: '80%',
        paddingTop: 0
    },
    header: {
        paddingLeft: 35,
        paddingTop: 10
        //margin: 10
    },
    boxButton: {
        paddingLeft: theme.spacing(4)
    },
    button: {
        textTransform: 'none'
    }
}));

function convertDate(date) {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("");
}

export default function Sessions() {

    const classes = useStyles();
    const history = useHistory();

    /***************************************************************************************
     * Sessions Per Provider
     ***************************************************************************************/
    const [sessionsPerProviderProviderId, setSessionsPerProviderProviderId] = React.useState(null);
    const handleSessionsPerProviderProviderId = event => {
        setSessionsPerProviderProviderId(event.target.value);
    }
    const [sessionsPerProviderDateFrom, setSessionsPerProviderDateFrom] = React.useState(new Date('2019-01-01'));
    const handleSessionsPerProviderDateFrom = dateFrom => {
        setSessionsPerProviderDateFrom(dateFrom);
    }
    const [sessionsPerProviderDateTo, setSessionsPerProviderDateTo] = React.useState(new Date('2019-12-01'));
    const handleSessionsPerProviderDateTo = dateTo => {
        setSessionsPerProviderDateTo(dateTo);
    }
    const sessionsPerProviderSubmitHandler = event => {
        event.preventDefault();
        history.push(`/sessionsPerProvider/` + sessionsPerProviderProviderId + `/` + convertDate(sessionsPerProviderDateFrom) + `/` + convertDate(sessionsPerProviderDateTo));
    }

    /***************************************************************************************
     * Sessions Per EV
     ***************************************************************************************/
    const [sessionsPerEVVehicleId, setSessionsPerEVVehicleId] = React.useState(null);
    const handleSessionsPerEVVehicleId = event => {
        setSessionsPerEVVehicleId(event.target.value);
    }
    const [sessionsPerEVDateFrom, setSessionsPerEVDateFrom] = React.useState(new Date('2019-01-01'));
    const handleSessionsPerEVDateFrom = dateFrom => {
        setSessionsPerEVDateFrom(dateFrom);
    }
    const [sessionsPerEVDateTo, setSessionsPerEVDateTo] = React.useState(new Date('2019-12-01'));
    const handleSessionsPerEVDateTo = dateTo => {
        setSessionsPerEVDateTo(dateTo);
    }
    const sessionsPerEVSubmitHandler = event => {
        event.preventDefault();
        history.push(`/sessionsPerEV/` + sessionsPerEVVehicleId + `/` + convertDate(sessionsPerEVDateFrom) + `/` + convertDate(sessionsPerEVDateTo));
    }

    /***************************************************************************************
     * Sessions Per Station
     ***************************************************************************************/

    return (


        <div className={classes.root}>
            <NavBar/>

            <div className={classes.containerC}>
                <Paper elevation={6} className={classes.paper}>
                    <div className={classes.header}>
                        <h3>Sessions per Provider </h3>
                    </div>
                    <form autoComplete="off" onSubmit={sessionsPerProviderSubmitHandler}>

                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">

                            <Box p={2}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="providerId" shrink={true}>Provider ID</InputLabel>
                                    <Input required={true} id="providerId" type="number"
                                           value={sessionsPerProviderProviderId}
                                           onChange={e => handleSessionsPerProviderProviderId(e)}/>
                                </FormControl>
                            </Box>

                            <Box p={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        format="yyyy/MM/dd"
                                        margin="normal"
                                        id="dateFrom"
                                        label="Date From"
                                        value={sessionsPerProviderDateFrom}
                                        onChange={handleSessionsPerProviderDateFrom}
                                    />
                                </MuiPickersUtilsProvider>
                            </Box>

                            <Box p={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        format="yyyy/MM/dd"
                                        margin="normal"
                                        id="dateTo"
                                        label="Date To"
                                        value={sessionsPerProviderDateTo}
                                        onChange={handleSessionsPerProviderDateTo}
                                    />
                                </MuiPickersUtilsProvider>
                            </Box>
                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={sessionsPerProviderSubmitHandler}>
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </div>

            <div className={classes.containerN}>
                <Paper elevation={6} className={classes.paper}>
                    <div className={classes.header}>
                        <h3>Sessions per EV </h3>
                    </div>
                    <form autoComplete="off" onSubmit={sessionsPerEVSubmitHandler}>
                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">

                            <Box p={2}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="vehicleId" shrink={true}>Vehicle ID</InputLabel>
                                    <Input required={true} id="vehicleId" type="number"
                                           value={sessionsPerEVVehicleId}
                                           onChange={e => handleSessionsPerEVVehicleId(e)}/>
                                </FormControl>
                            </Box>
                            <Box p={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        format="yyyy/MM/dd"
                                        margin="normal"
                                        id="dateFrom"
                                        label="Date From"
                                        value={sessionsPerEVDateFrom}
                                        onChange={handleSessionsPerEVDateFrom}
                                    />
                                </MuiPickersUtilsProvider>
                            </Box>

                            <Box p={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        format="yyyy/MM/dd"
                                        margin="normal"
                                        id="dateTo"
                                        label="Date To"
                                        value={sessionsPerEVDateTo}
                                        onChange={handleSessionsPerEVDateTo}
                                    />
                                </MuiPickersUtilsProvider>
                            </Box>
                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={sessionsPerEVSubmitHandler}>
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </div>

            <div className={classes.containerN}>
                <Paper elevation={6} className={classes.paper}>
                    <div className={classes.header}>
                        <h3>Sessions per Point </h3>
                    </div>
                    <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">
                        <Box p={2} bgcolor="grey.300">
                            Item 1
                        </Box>
                        <Box p={2} bgcolor="grey.300">
                            Item 2
                        </Box>
                        <Box p={2} bgcolor="grey.300">
                            Item 3
                        </Box>

                        <Box p={2}>
                            <Button className={classes.button} variant="contained" color="primary" type="submit">
                                Search
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </div>

            <div className={classes.containerN}>
                <Paper elevation={6} className={classes.paper}>
                    <div className={classes.header}>
                        <h3>Sessions per Station </h3>
                    </div>
                    <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">
                        <Box p={2} bgcolor="grey.300">
                            Item 1
                        </Box>
                        <Box p={2} bgcolor="grey.300">
                            Item 2
                        </Box>
                        <Box p={2} bgcolor="grey.300">
                            Item 3
                        </Box>
                        <Box p={2}>
                            <Button className={classes.button} variant="contained" color="primary" type="submit">
                                Search
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </div>

        </div>

    )
        ;
}