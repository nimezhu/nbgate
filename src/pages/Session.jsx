import React from 'react';
import ReactDOM from 'react-dom';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles"

import SessionCard from "../module/SessionCard"

import localforage from "localforage"
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

import {
    useEffect
} from "react";


function Local(props) {
     useEffect(() => {
        var _db = localforage.createInstance({
            "name": "nbSession"
        })
        setDb(_db)
        _db.keys().then(function(d) {
            if (d.length == 0) {} else {
                setData(d)
            }
        })
    }, [])

    const [db, setDb] = React.useState(null);
    const [data, setData] = React.useState([]);
    return (<Box 
        display="flex"
        flexWrap="wrap"
        >
        {data.map(function(d){
            return (<SessionCard db={db} id={d}/>)
        })}
        </Box>)
}

function Index(props) {
    const {
        classes,
        version
    } = props
    return (<div>
        <Typography  component="h4" variant="h5" color="textPrimary" align="center" gutterBottom>Sessions in Local Storage</Typography>
        <Local classes={classes}/>
        </div>);
}

const Space = withStyles(styles)(Index);

export default Space
