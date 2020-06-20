import React from 'react';
import Box from '@material-ui/core/Box';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../../styles"

import HintCard from "./HintCard"

//TODO Hint Links 
const data = [
    {header:"Genome",title:"Navigate",pos:"on multiple panels",content:"Mouse right click on selected regions",link:"https://nucleome-browser.readthedocs.io", video:"#", image:"#"},
    {header:"Panel",title:"Compose",pos:"with panel space",content:"Panels control buttons on the top right",link:"https://nucleome-browser.readthedocs.io/en/latest/panel.html", video:"#", image:"#"},
    {header:"Session",title:"Manage",pos:"with session space",content:"Sessions save, load from localStorage",link:"https://nucleome-browser.readthedocs.io/en/latest/session.html", video:"#", image:"#"},
    {header:"Genome Browser",title:"How to use",pos:"panel module",content:"",link:"https://nucleome-browser.readthedocs.io/en/latest/gbrowser.html", video:"#", image:"#"},
    {header:"3D Chromosome Structure Viewer",title:"How to use",pos:"panel module",content:"",link:"https://nucleome-browser.readthedocs.io/en/latest/threed.html", video:"#", image:"#"},
    {header:"Track DnD",title:"Reuse tracks through",pos:"API",content:"How to drag bigwig track to 3D chromosome struture or other web applications",link:"#", video:"#",image:"#"},
    {header:"Your data",title:"Add",pos:"with multiple data service tools",content:"Data tools",link:"https://github.com/nucleome/nucleserver", video:"#", image:"#"},
    {header:"Other Genome Browsers",title:"Work with",pos:"through Nucleome Bridge",content:"Nucleome Bridge",link:"https://nucleome-browser.readthedocs.io/en/latest/apps.html", video:"#", image:"#"},
    {header:"Google Sheet",title:"Work with",pos:"through Nucleome Bridge",content:"Nucleome GSheet Addon",link:"https://nucleome-browser.readthedocs.io/en/latest/gsheet.html", video:"#", image:"#"},
]

//TODO: Manage Hint Data Create Tool. 


function Index(props) {
  const {
        classes,
        version
    } = props
return (
    <div>
    <Box 
        display="flex"
        flexWrap="wrap"
    >
    {data.map((d) => {
        return <HintCard classes={classes} data={d}/>
    })}
    </Box>
    </div>
    );
}

const Hints = withStyles(styles)(Index);

export default Hints
