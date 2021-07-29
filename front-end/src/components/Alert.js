import React from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    alert: {
    }
}));


function Alert(props) {

    const classes = useStyles();

    return <MuiAlert elevation={3} variant="filled" {...props} />
}

Alert.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired
}

export default Alert;