import React, {
    useEffect
} from "react"

import AppBar from '@material-ui/core/AppBar';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as d3 from "d3"

import Tabs from "@material-ui/core/Tabs"
import Box from "@material-ui/core/Box"
import Tab from "@material-ui/core/Tab"

import PropTypes from "prop-types"

import download from "../tools/download"

import layoutIcon from "../module/layoutIcon"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var niceFormat = d3.format(",")
var regionNiceText = function(d) {
    return d.chr + ":" + niceFormat(d.start) + "-" + niceFormat(d.end)
}
var regionsNiceText = function(d) {
    var r = []
    d.forEach(function(d) {
        r.push(regionNiceText(d))
    })
    return r.join(";")
}
var trans = function(d) {
    if (d == "-1") {
        return "main"
    }
    return "ext" + d
}


function TabPanel(props) {
    const {
        idx,
        value,
        data,
        ...other
    } = props;
    const svgRef = React.createRef()
    const icon = layoutIcon()
    const width =  300 
    const height = 240
    const render = function(d0){
            var d = JSON.parse(d0)
            d3.select(svgRef.current).selectAll("g").data([d]).enter()
            .append("g")
            .call(icon)
    }
    useEffect(function(){
        render(data)
    })


    return (
        <Typography
      component="div"
      hidden={value !== idx}
    >
      <Box p={3}>
        <svg ref={svgRef} width={width} height={height}>
        </svg>
        </Box>
    </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function SessionCard(props) {
    const {
        idx,
        data
    } = props
    const [hide, setHide] = React.useState(false)
    const [value, setValue] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const handleDelete = function() {
    }
    const handleOpen = function() {
        setOpen(true)
    }
    const handleClose = function() {
        setOpen(false)
    }
    const handleDownload = function() {
        download("nucle_"+data[0].replace(/ /g,'_')+".json",data[2])

    }
    const handlePlay = function() {
        window.open("/v1/main.html?config=/sheet?idx="+(idx+1))
    }


    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const divRef = React.createRef()
    useEffect(function() {
        var allw = JSON.parse(data[2])
       var div = d3.select(divRef)
    }, [])
    return (
        <Box m={1}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        </Dialog>
        <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
              {data[0]}
          </Typography>
        <Typography component="div" ref={divRef}>
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" color="primary" onClick={handlePlay}>
            Open
        </Button>
        <Button size="small" color="primary" onClick={handleDownload}>
            Download
        </Button>
        </CardActions>
        </Card>
        </Box>
    )
}
export default SessionCard
