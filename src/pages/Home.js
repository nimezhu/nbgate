import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NbIcon from "../module/NbIcon";
import NbBanner from "../module/NbBanner";

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
        classes
    } = props
     const [open, setOpen] = React.useState(false);
     const [version,setVersion] = React.useState("Not Available")
     const [modalStyle] = React.useState(getModalStyle);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getVersion = () => {
      console.log("get version")
    if (navigator.serviceWorker) {
        if (navigator.serviceWorker.controller) {
            var messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = function(event) {
                setVersion(event.data.version)
            }
            navigator.serviceWorker.controller.postMessage({
                "command": "version",
            }, [messageChannel.port2]);
        } else {
            console.log("No Service Worker");
        }
    }
}
getVersion()
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

        <Button variant="outlined" title="Genome Browser" onClick={handleClick}>Genome Browser</Button>
        </Typography>
        <hr/>
        <Typography type="div">
        <Button variant="outlined" title="K562 Cell Line" color="primary" onClick={handleOpen}>K562</Button>
        </Typography>
        </div>
    </Modal>
    <Container maxWidth="sm">
      <Box>
       <NbIcon scale="0.4"/>
      </Box>
      <Box>
         <NbBanner classes={classes}/>
        <Box style={{textAlign:"center"}}>
        <Button variant="outlined" title="Open Web Application" color="secondary" size="large" onClick={handleOpen}>Start</Button>
        </Box>
        <hr/>
        <Typography type="p">
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
        <Typography variant="h6" align="center" gutterBottom>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            client version: {version} 
        </Typography>
      </footer>
    </Container>
    </div>
    );
}

const Home = withStyles(styles)(Index);

export default Home
