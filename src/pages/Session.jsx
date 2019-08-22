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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';


import {
    useEffect
} from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}


//TODO Cloud Session
function Cloud(props) { //Dnd Session To Cloud??

    useEffect(() => {
        fetch("/sheetlist", {
            "credentials": "include"
        }).then(function(d) {
            var e = d.json()
            return e
        }).then(function(d) {
            console.log("sheetlist", d)
            setData(d)
        }).catch(function(e, i) {
            console.log("error", e, i)
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
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
    return (<div>
         <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
            <Tab label="Local" {...a11yProps(0)} />
            <Tab label="Cloud" {...a11yProps(1)} hidden={version==null}/>
        </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        <Typography  component="h4" variant="h5" color="textPrimary" align="center" gutterBottom>Sessions in Local Storage</Typography>
        <Local classes={classes}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Typography  component="h4" variant="h5" color="textPrimary" align="center" gutterBottom>Sessions in Google Sheet</Typography>
        <Cloud classes={classes} version={version}/>
        </TabPanel>
        </div>);
}

const Space = withStyles(styles)(Index);

export default Space
