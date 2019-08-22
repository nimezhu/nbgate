import React from 'react';
import ReactDOM from 'react-dom';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles"


import Box from '@material-ui/core/Box';

function Portal(props) {
}

function Index(props) {
    const {
        classes,
        version
    } = props
    return (<div>
        Coming soon...
        Various Web Pages that can be interactively browsed with Nucleome Browser
        </div>);
}

const Space = withStyles(styles)(Index);

export default Space
