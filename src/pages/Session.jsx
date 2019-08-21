import React from 'react';
import ReactDOM from 'react-dom';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles"

import SessionCard from "../module/SessionCard"
import RemoteSessionCard from "../module/RemoteSessionCard"

import localforage from "localforage"
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import {
    useEffect
} from "react";

//TODO Cloud Session
function Cloud(props) { //Dnd Session To Cloud??
     
    useEffect(() => {
        fetch("/sheetlist",{"credentials":"include"}).then(function(d){
             var e = d.json()
             return e
        }).then(function(d){
            console.log("sheetlist",d)
            setData(d)
        }).catch(function(e,i){
            console.log("error",e,i)
        })
    }, [])
    const [data, setData] = React.useState([]);
    return (<Box 
        display="flex"
        flexWrap="wrap"
        >
        {data.map(function(d,i){
            return (<RemoteSessionCard data={d} idx={i}/>)
        })}
        </Box>)
}

function Local(props) {
    /*
     var sessionDb = localforage.createInstance({
            "name": "nbSession"
        })
    */
    useEffect(() => {
        var _db = localforage.createInstance({
            "name": "nbSession"
        })
        setDb(_db)
        _db.keys().then(function(d) {
            if (d.length == 0) {
            } else {
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
        <Box>
        <Typography  component="h4" variant="h5" color="textPrimary" align="center" gutterBottom>Sessions in Local Storage</Typography>
        <Local classes={classes}/>
        </Box>
        <Box hidden={version==null}>
        <Typography  component="h4" variant="h5" color="textPrimary" align="center" gutterBottom>Sessions in Google Sheet</Typography>
        <Cloud classes={classes} version={version}/>
        </Box>
        </div>);
}

const Space = withStyles(styles)(Index);

export default Space
