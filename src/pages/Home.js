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

import Modal from '@material-ui/core/Modal';

import {
    withStyles
} from "@material-ui/styles";
import styles from "../styles";
import classNames from "classnames";

/*
function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      //margin:'auto',
      display: 'flex !important',
      alignItems: 'center',
      left: `${left}%`
    };
  }
*/
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function handleClick() {
    window.open("/v1/main.html")
}


function Index(props) {
    const {
        classes,
        version
    } = props
     const [open, setOpen] = React.useState(false);
     const [modalStyle] = React.useState(getModalStyle);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
     return (
        <div>
    <Modal 
         aria-labelledby="Nucleome Browser Entries"
         aria-describedby="Nucleome"
        open={open}
        onClose={handleClose}
    >
        <div className={classes.modal} style={modalStyle}>

        <Typography type="div">
         
        </Typography>
        <EntryDiv classes={classes}/>
        </div>
    </Modal>
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
