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


function getModalStyle() {
    const top = 25;
    const left = 10;
    return {
      top: `${top}%`,
      margin:'auto',
      left: `${left}%`
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
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        style={{alignItems:'center',justifyContent:'center'}}
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
            A Multi Modality Genome Data Browser
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
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            client version: {version} 
        </Typography>
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
