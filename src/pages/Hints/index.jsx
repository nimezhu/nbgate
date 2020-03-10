import React from 'react';
import Box from '@material-ui/core/Box';
import {
    withStyles
} from "@material-ui/styles";
import styles from "../../styles"

import HintCard from "./HintCard"

const data = [
    {header:"Genome coordinates",title:"Navigate",pos:"on multiple panels",content:"Mouse right click on selected regions",link:"#", video:"#", image:"#"},
    {header:"Your data",title:"Add",pos:"with data tools",content:"Data tools",link:"https://github.com/nucleome/nucleserver", video:"#", image:"#"},
    {header:"Panel",title:"Compose",pos:"with panel space",content:"Panels control buttons on the top right",link:"#", video:"#", image:"#"},
    {header:"Session",title:"Manage",pos:"with session space",content:"Sessions save, load from localStorage",link:"#", video:"#", image:"#"},
    {header:"Track DnD",title:"Reuse tracks through",pos:"API",content:"How to drag bigwig track to 3D chromosome struture or other web applications",link:"#", video:"#",image:"#"},
    {header:"Other Genome Browsers",title:"Works with",pos:"through Nucleome Bridge",content:"Nucleome Bridge",link:"#", video:"#", image:"#"},
    {header:"Google Sheet",title:"Works with",pos:"through Nucleome Bridge",content:"Nucleome GSheet Addon",link:"#", video:"#", image:"#"},
]

//TODO: Manage Hint Data Create Tool. 


function Index(props) {
  const {
        classes,
        version
    } = props
return (
    <div>
    This Page is under construction
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