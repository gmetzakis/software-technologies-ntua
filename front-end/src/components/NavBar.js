import React from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Tooltip,
    Link
} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        paddingLeft: 500
    },
    homeButton: {
        marginRight: theme.spacing(4),
        '&:hover': {
            color: 'inherit',
        },
    },
    bar: {
        //alignItems: 'center',
    },
}));

export default function NavBar() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bar}>

                <Toolbar>
                    <Tooltip title="Home" placement="left-start">
                        <Link
                            href="/sessions"
                            className={classes.homeButton}
                            color="inherit"
                        >
                            <HomeIcon/>
                        </Link>
                    </Tooltip>

                    <Typography variant="h6" className={classes.title}>
                        TL20-48 EV Charge
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}