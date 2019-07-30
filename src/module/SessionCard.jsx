import React, {
    useEffect
} from "react"

import AppBar from '@material-ui/core/AppBar';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PanelIcons from "../panel/icons"
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
        id,
        db
    } = props
    const [hide, setHide] = React.useState(false)
    const [data, setData] = React.useState({label:[]})
    const [value, setValue] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const handleDelete = function() {
        db.removeItem(id).then(function() {
            setHide(true)
        })
        setOpen(false)
    }
    const handleOpen = function() {
        setOpen(true)
    }
    const handleClose = function() {
        setOpen(false)
    }
    const handleDownload = function() {
        download("nucle_"+id+".json",JSON.stringify(data.wins))
    }
    const handlePlay = function() {
        window.open("/v1/main.html?config=localstorage:"+id)
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
        /*
        var allw = JSON.parse(d[2])
       var div = d3.select(divRef)
        */
        db.getItem(id).then(function(d0) {
            var wins = JSON.parse(d0.data)
            var keys = Object.keys(wins)
            keys.sort(function(a,b){return parseInt(a)-parseInt(b)})
            if (keys[0]=="-2"){
                keys.shift();
             }
            console.log(keys)
            var k = keys.map(function(d){return trans(d)})
            setData({label:k,keys:keys,wins:wins})
        })


    }, [])
    return (
        <Box m={1}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Session " + id}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             Do you really want to delete this session from local storage?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
           
            <Button onClick={handleDelete} color="primary" autoFocus>
              Delete
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel 
            </Button>
          </DialogActions>
        </Dialog>


        <Card style={{"width":"350px"}} hidden={hide}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {id}
          </Typography>
        <Typography component="div" ref={divRef}>
            <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="scrollable" aria-label="simple tabs example">
        {data.label.map(function(d,i){
            return (<Tab label={d}  style={{width:"30px"}} {...a11yProps(i)} />)
        })}
        </Tabs>
      </AppBar>
            {data.label.map(function(o,i){return <TabPanel label={o} value={value} idx={i} data={data.wins[data.keys[i]]}/>})}
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" color="primary" onClick={handlePlay}>
            Open
        </Button>
        <Button size="small" color="primary" onClick={handleDownload}>
            Download
        </Button>
        <Button size="small" color="primary" onClick={handleOpen}>
            Delete
        </Button>
        </CardActions>
        </Card>
        </Box>
    )
}
export default SessionCard
