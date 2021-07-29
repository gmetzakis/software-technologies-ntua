import React, {useEffect} from 'react';
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Toolbar,
    Typography,
    Grid,
    IconButton, Collapse, Box
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import axios from "axios";
import NavBar from "./NavBar";


const useStyles = makeStyles(theme => ({
    root: {
        //width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 40
    },
    paper: {
        marginTop: theme.spacing(1),
        //width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(1),
    },
    table: {
        //width: 330,
    },
    bar: {
        paddingTop: 10,
        paddingBottom: 20
    },
}));


const Cell = ({list, isOpen}) => {

    return (
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Typography style={{paddingTop: 10, paddingLeft: 20, color: 'grey'}} variant="h6" gutterBottom component="div">
                        <b>Charging Sessions</b>
                    </Typography>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><b>Session</b></TableCell>
                                <TableCell><b>Energy Provider</b></TableCell>
                                <TableCell><b>Started on</b></TableCell>
                                <TableCell><b>Finished on</b></TableCell>
                                <TableCell><b>Energy Delivered</b></TableCell>
                                <TableCell><b>Price Policy Ref</b></TableCell>
                                <TableCell><b>Cost/KWh</b></TableCell>
                                <TableCell><b>Cost</b></TableCell>
                                <TableCell><b>Index</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((session, index) => (
                                <TableRow key={session.SessionID}>
                                    <TableCell><b>{index + 1}</b></TableCell>
                                    <TableCell>{session.SessionID}</TableCell>
                                    <TableCell>{session.EnergyProvider}</TableCell>
                                    <TableCell>{session.StartedOn}</TableCell>
                                    <TableCell>{session.FinishedOn}</TableCell>
                                    <TableCell>{session.EnergyDelivered}</TableCell>
                                    <TableCell>{session.PricePolicyRef}</TableCell>
                                    <TableCell>{session.CostPerKWh}</TableCell>
                                    <TableCell>{session.SessionCost}</TableCell>
                                    <TableCell>{session.SessionIndex}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        </TableCell>
    );
}

export default function SessionsPerEV() {

    const classes = useStyles();
    const path = window.location.pathname;

    const vehicleId = path.substring(15, path.length - 18);
    const dateFrom = path.substring(path.length - 17, path.length - 9);
    const dateTo = path.substring(path.length - 8, path.length);
    const token = localStorage.getItem("access-token").toString().replace(/['"]+/g, '');

    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState(
        [
            {
                NumberOfVehicleChargingSessions: 0,
                TotalEnergyConsumed: 0.0,
                NumberOfVisitedPoints: 0,
                VehicleID: '',
                PeriodFrom: '',
                PeriodTo: '',
                RequestTimestamp: '',
                VehicleChargingSessionsList: [
                    {
                        SessionID: '',
                        EnergyProvider: '',
                        StartedOn: '',
                        FinishedOn: '',
                        EnergyDelivered: 0.0,
                        PricePolicyRef: 0,
                        CostPerKWh: 0.0,
                        SessionCost: 0.0,
                        SessionIndex: 0
                    }
                ]
            }
        ]
    );

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {

        const url = 'http://localhost:8765/evcharge/api/SessionsPerEV/' + vehicleId + '/' + dateFrom + '/' + dateTo;
        axios.get(url, {
            headers: {
                'x-observatory-auth': token
            }
        }).then(response => {
            setData(response.data);
        })
    }

    return (
        <div>
            <NavBar/>
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={9}>
                    <Toolbar className={classes.bar}>
                        <Grid container direction="column">
                            <Grid item xs>
                                <Typography variant="h7">Vehicle <b>{data[0].VehicleID}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">Requested on <b>{data[0].RequestTimestamp}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">Period From <b>{data[0].PeriodFrom}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">Period To <b>{data[0].PeriodTo}</b></Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Total Energy Consumed</b></TableCell>
                                <TableCell><b>Visited Points</b></TableCell>
                                <TableCell><b>No. Charging Sessions</b></TableCell>
                                <TableCell><b>Expand Charging Sessions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map(row => (
                                <React.Fragment>
                                    <TableRow key={row.VehicleID}>
                                        <TableCell component="th" scope="row">{row.TotalEnergyConsumed}</TableCell>
                                        <TableCell>{row.NumberOfVisitedPoints}</TableCell>
                                        <TableCell>{row.NumberOfVehicleChargingSessions}</TableCell>
                                        <TableCell>
                                            <IconButton size="small" onClick={() => setOpen(!open)}>
                                                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <Cell list={row.VehicleChargingSessionsList} isOpen={open}/>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    )
}