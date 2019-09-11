import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import NbIcon from "../module/NbIcon";
import NbBanner from "../module/NbBanner";
import EntryDiv from "../module/Entry";
import LocalEntryDiv from "../module/LocalEntry";
import CardMedia from '@material-ui/core/CardMedia';
import Tooltip from '@material-ui/core/Tooltip';


import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles";
import classNames from "classnames";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function Index(props) {
  const {
        classes,
        version
    } = props
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const hubsClick = () => {
    var location = "/v1/main.html?initedLayout=hubs"
    window.location.href = location
}
  const continueClick = () => {
    var location = "/v1/main.html?config=continue"
    window.location.href = location
}
     return (
        <div>
    <Dialog
         aria-labelledby="Nucleome Browser Entries"
         aria-describedby="Nucleome"
        open={open}
        onClose={handleClose}
    >
        <div>
        <DialogTitle id="alert-dialog-title">{"Start Exploring Nucleome"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Quick Start
            </DialogContentText>
                <Tooltip title="Genome Browser" aria-label="Genome Browser">
                        <Button color="secondary" variant="contained"onClick={hubsClick} className={classes.button}>
                            Genome Browser 
                        </Button>
                </Tooltip>
          </DialogContent>
           <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Start with a Public Session
            </DialogContentText>
            <EntryDiv classes={classes}/>
          </DialogContent>
           <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Start with a Local Session
            </DialogContentText>
              <LocalEntryDiv classes={classes}/>
          </DialogContent>
           <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Continue with recently closed session 
            </DialogContentText>
          <Button variant="contained" onClick={continueClick} className={classes.button}>
                             Continue
              </Button>

          </DialogContent>
          

        <Typography type="div">
         
        </Typography>
        </div>
    </Dialog>
    <Container maxWidth="lg">

      <Box>
       <NbIcon scale="0.3"/>
      </Box>
      <Box>
         <NbBanner classes={classes}/>
        <Box style={{textAlign:"center"}}>
        <Button variant="outlined" title="Open Browser" color="secondary" size="large" onClick={handleOpen}>Start</Button>
        </Box>
        <Typography type="p" style={{textAlign:"center"}}>
        </Typography>
      </Box>
    </Container>
    <Container maxWidth="lg">
    <div className={classNames(classes.layout, classes.cardGrid)}>
    <Grid container spacing={4}>
         <Grid item sm={12} md={6} lg={4}>
        </Grid>
         
         <Grid item sm={12} md={6} lg={4}>
         </Grid>

        <Grid item sm={12} md={6} lg={4}>
         </Grid>

      </Grid>
      </div>
      
    </Container>
    <Container>

    </Container>

    </div>
    );
}

const Home = withStyles(styles)(Index);

export default Home
