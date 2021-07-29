import React, {useEffect} from 'react';
import moment from 'moment';
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
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
        justifyContent: 'center',
    },
}));

const SPTable = ({list}) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={9}>
                <Toolbar className={classes.bar}>
                    <Typography variant="h5">Provider {list[0].ProviderName} - {list[0].ProviderID}</Typography>
                </Toolbar>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'><b>Station</b></TableCell>
                            <TableCell align='left'><b>Session</b></TableCell>
                            <TableCell align='left'><b>Vehicle</b></TableCell>
                            <TableCell align='left'><b>Started</b></TableCell>
                            <TableCell align='left'><b>Finished</b></TableCell>
                            <TableCell align='left'><b>Energy Delivered</b></TableCell>
                            <TableCell align='left'><b>Price Policy Ref</b></TableCell>
                            <TableCell align='left'><b>Cost/KWh</b></TableCell>
                            <TableCell align='left'><b>Total Cost</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list && list.map(session => (
                            <TableRow key={session.SessionID}>
                                <TableCell>{session.StationID}</TableCell>
                                <TableCell>{session.SessionID}</TableCell>
                                <TableCell>{session.VehicleID}</TableCell>
                                <TableCell>{moment(new Date(session.StartedOn)).format("HH:mm:ss.SSS A on D MMM YYYY")}</TableCell>
                                <TableCell>{moment(new Date(session.FinishedOn)).format("HH:mm:ss.SSS A on D MMM YYYY")}</TableCell>
                                <TableCell>{session.EnergyDelivered}</TableCell>
                                <TableCell>{session.PricePolicyRef}</TableCell>
                                <TableCell>{session.CostPerKWh}</TableCell>
                                <TableCell>{session.TotalCost}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default function SessionPerProviderTable() {
    const path = window.location.pathname;

    const providerId = path.substring(21, path.length - 18);
    const dateFrom = path.substring(path.length - 17, path.length - 9);
    const dateTo = path.substring(path.length - 8, path.length);
    const token = localStorage.getItem("access-token").toString().replace(/['"]+/g, '');

    const [data, setData] = React.useState(
        [
            {
                ProviderID: 0,
                ProviderName: '',
                StationID: 0,
                SessionID: '',
                VehicleID: 0,
                StartedOn: '',
                FinishedOn: '',
                EnergyDelivered: 0.0,
                PricePolicyRef: 0,
                CostPerKWh: 0.0,
                TotalCost: 0.0,
            }
        ]
    );

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {

        const url = 'http://localhost:8765/evcharge/api/SessionsPerProvider/' + providerId + '/' + dateFrom + '/' + dateTo;
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
            <SPTable list={data}/>
        </div>
    )
}