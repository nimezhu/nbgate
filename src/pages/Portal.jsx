import React from 'react';
import ReactDOM from 'react-dom';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles"


import Box from '@material-ui/core/Box';

function Apps(props) {
}

function Index(props) {
    const {
        classes,
        version
    } = props
    return (<div>
        Under Construction. Coming soon...
        </div>);
}

const Space = withStyles(styles)(Index);

export default Space
