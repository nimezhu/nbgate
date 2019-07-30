import React, {
    useEffect
} from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import PanelIcons from "../panel/icons"
import * as d3 from "d3"

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog() {
    const [open, setOpen] = React.useState(false);
  
    function handleClickOpen() {
      setOpen(true);
    }
  
    function handleClose() {
      setOpen(false);
    }
  
    return (
      <div>
        
      </div>
    );
  }
function PanelCard(props) {
    const {
        id,
        db
    } = props
    const [hide, setHide] = React.useState(false)
    const [data, setData] = React.useState({})
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
    const svgRef = React.createRef()
    useEffect(function() {
        db.getItem(id).then(function(d0) {
            var d = JSON.parse(d0)
            var svg = d3.select(svgRef.current)
            if (d.render in PanelIcons) { //TODO Remove S
                var r = PanelIcons[d.render]().width(270)
                var e = svg.selectAll("g").data([d])
                e.enter()
                    .append("g")
                    .merge(e)
                    .call(r)
            } else {
                //el0.text(d.name + " " + ":TODO render")
            }

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
          <DialogTitle id="alert-dialog-title">{"Delete Panel " + id}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             Do you really want to delete this panel from space?
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

        <Card style={{"width":"300px"}} hidden={hide}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {id}
          </Typography>
          <Typography component="div">
            <svg ref={svgRef}></svg>
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" color="primary" onClick={handleOpen}>
            Delete
        </Button>
        </CardActions>
        </Card>
         </Box>
    )
}
export default PanelCard
