import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NbIcon from "../module/NbIcon";
import NbBanner from "../module/NbBanner";
import EntryDiv from "../module/Entry";
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

function handleClick() {
    window.open("/v1/main.html")
}


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
              Continue with a Local Session
            </DialogContentText>
              TODO
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
        <Button variant="outlined" title="Open Web Application" color="secondary" size="large" onClick={handleOpen}>Start</Button>
        </Box>
        <hr/>
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
      <footer className={classes.footer}>
        {version !== null ?
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            client version: {version} 
        </Typography>
        : null}
        <Typography variant="subtitle1" align="center" gutterBottom>
        4D Nucleome and Carnegie Mellon University
        <CardMedia
            image="./images/cmu_logo.jpg"
        />
        </Typography>

      </footer>
    </Container>
    </div>
    );
}

const Home = withStyles(styles)(Index);

export default Home
