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
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import BookIcon from '@material-ui/icons/Book';
import PlayIcon from '@material-ui/icons/PlayArrow';
import AppsIcon from '@material-ui/icons/Apps';
import DynamicFeedIcon from '@material-ui/icons/ArtTrack';

import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {
    makeStyles,
    useTheme
} from '@material-ui/core/styles';
import { FaGithub } from 'react-icons/fa';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
     root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }, 
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
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
    const [nav, setNav] = React.useState(a[5] || "home");

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
    function openApps() {
      window.open("/static/store")
    }
    function openStories() {
      window.open("/static/journal")
    }
 
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    function handleLink(d) {
        if (d=="browser") {
            return function handle() {
                var k = localStorage.getItem("_cnb_")
                if (k==null) {
                    window.location.href = "/v1/main.html?initedLayout=hubs"
                } else {
                    window.location.href = "/v1/main.html?config=continue"
                }
            }
        }
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
              {label:"Back to Browser",id:'browser', icon:<PlayIcon />},
              {label:"Session Space",id:'session', icon:<ViewCompactIcon />},
              {label:"Panel Space",id:'space', icon:<DashboardIcon />},
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
      <Tooltip title="Apps">  
    <IconButton
            color="inherit"
            aria-label="Apps"
            edge="start"
            onClick={openApps}
            >
             <AppsIcon/>
        </IconButton>
    </Tooltip>

    <Tooltip title="Data Driven Pages">  
    <IconButton
            color="inherit"
            aria-label="Stories"
            edge="start"
            onClick={openStories}
            >
             <DynamicFeedIcon/>
        </IconButton>
    </Tooltip>
    <Tooltip title="Documentation">  
    <IconButton
            color="inherit"
            aria-label="Docs"
            edge="start"
            onClick={openDocs}
            >
             <BookIcon/>
            </IconButton>
    </Tooltip>
    <Tooltip title="Source Codes">
    <IconButton color="inherit" edge="start" aria-label="GitHub Home" onClick={openGitHub}>
        <FaGithub/>        
    </IconButton>
    </Tooltip>
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
        <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" gutterBottom>
              2019 © <a href="https://www.cs.cmu.edu/~jianma/" target="_blank">Ma Lab</a> @ CMU
              <Typography align="right" type="span">
              <img style={{top:10,height:33}} src="/entry/images/cmu_logo.jpg"/>
              <img style={{top:10,height:33}} src="/entry/images/4dn-logo_1.png"/>
              </Typography>
        </Typography>

      </footer>
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
