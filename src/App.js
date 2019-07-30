import {
    Route,
    Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import Space from './pages/Space';
import Session from './pages/Session';

import {
    withRouter
} from 'react-router-dom'



import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import HomeIcon from '@material-ui/icons/Home';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import MenuIcon from '@material-ui/icons/Menu';
import BookIcon from '@material-ui/icons/Book';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
    makeStyles,
    useTheme
} from '@material-ui/core/styles';
import { FaGithub } from 'react-icons/fa';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
    },
    drawer: {
            width: drawerWidth,
    },
    appBar: {
        width: "100%",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        paddingTop: 15,
        paddingLeft: 20,
    },
    content: {
        padding: theme.spacing(3),
        width: "100%",
    },
    toolbarButtons: {
        marginLeft: 'auto',
        marginRight: -12,
    },

}));


function ResponsiveDrawer(props) {
    const {
        container,
    } = props;
    const theme = useTheme()
    const classes = useStyles();
    const [swInited, setSwInited] = React.useState(false)

    const [version,setVersion] = React.useState(null)
    const [mobileOpen, setMobileOpen] = React.useState(false);
    var a = window.location.href.split('/')
    const [nav, setNav] = React.useState(a[5] || "about");

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleAnchor(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    }
    function openGitHub() {
      window.open("https://github.com/nucleome")
    }
    function openDocs() {
      window.open("https://nucleome-browser.readthedocs.io")
    }
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    function handleLink(d) {
        return function handle() {
            setNav(d)
            props.history.push("./" + d)
        }

    }
    function handleClose() {
      setAnchorEl(null);
    }
    const getVersion = () => {
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
const initVersion = () => {
   if (!swInited) {
    if (navigator.serviceWorker) {
    console.log("ServiceWorkersSupported");
    navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        })
        .then(function(reg) {
            console.log("ServiceWorkerstered", reg);
            setSwInited(true)
            getVersion()
        })
        .catch(function(error) {
            console.log("Failedegister ServiceWorker", error);
         });
   } else {
     console.log("Service Worker Not Supported")
     setSwInited(true)
   }
  }
}


    const drawer = (
        <div>
      <div className={classes.toolbar}> 
        <div className={classes.drawerHeader}>
        <Typography variant="h6" color="primary" >Nucleome Browser</Typography>
        {version !== null ?
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            client version: {version} 
        </Typography>
        : null}
      
        </div>
      </div>
      <Divider />
        <List>
            {[
              {label:"Home",id:'home',icon:<HomeIcon />},
              {label:"Panel Space",id:'space', icon:<ViewComfyIcon />},
              {label:"Session Space",id:'session', icon:<ViewCompactIcon />},
              ].map((d, index) => (
              <ListItem button key={d.id} onClick={handleLink(d.id)}>
                <ListItemIcon>{d.icon}</ListItemIcon>
                <ListItemText primary={d.label} />
             </ListItem>
            ))}
          </List>
 
      <Divider />
    </div>
    );

    initVersion()
    return (
        <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
        {nav}
            </Typography>
      <section className={classes.toolbarButtons}>     
      <IconButton
            color="inherit"
            aria-label="Docs"
            edge="start"
            onClick={openDocs}

            >
             <BookIcon/>
            </IconButton>
    <IconButton color="inherit" aria-label="GitHub Home" onClick={openGitHub}>
        <FaGithub/>        
    </IconButton>
    <div hidden={true}>
    <IconButton color="inherit" aria-label="More Options" onClick={handleAnchor}>
        <MoreVertIcon />
     </IconButton>
          <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
    </div>
      </section> 
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden>
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
       <Divider />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}>
        
        </div>
          <Switch>
          <Route path='/entry/home'  component={() => <Home version={version}/>}/>
          <Route exact path='/entry/' component={() => <Home version={version}/>}/>
          <Route exact path='/entry/space' component={() => <Space version={version}/>}/>
          <Route exact path='/entry/session' component={() => <Session version={version}/>}/>
        </Switch>
        </main>
    </div>
    );
}

ResponsiveDrawer.propTypes = {
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
};


const App = withRouter(ResponsiveDrawer);
export default App;
