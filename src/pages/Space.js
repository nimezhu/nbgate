import React from 'react';
import ReactDOM from 'react-dom';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles"

import PanelIcons from "../panel/icons"

import PanelCard from "../module/PanelCard"
import localforage from "localforage"
import * as d3 from "d3"
import {
    useEffect
} from "react";

import Box from '@material-ui/core/Box';

function PanelSpace(props) {
    const [panels, setPanels] = React.useState([]);
    const [db, setDb] = React.useState(null);
    useEffect(() => {
        var nbPanel = localforage.createInstance({
            "name": "nbPanel"
        })
        setDb(nbPanel)
        nbPanel.keys().then(function(d) {
            if (d.length == 0) {
            } else {
                setPanels(d)
            }
        })
    }, [])
    return (<Box
        display="flex"
        flexWrap="wrap" 
        >
        {panels.map(function(o,i){return <PanelCard db={db} id={o}/>})}
    </Box>)
}

function Index(props) {
    const {
        classes,
        version
    } = props
    return (<div>
        <PanelSpace classes={classes}/>
        </div>);
}

const Space = withStyles(styles)(Index);

export default Space
