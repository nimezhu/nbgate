import {
    Route,
    Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import Space from './pages/Space';
import Session from './pages/Session';
import Portal from "./pages/Portal";
import Gallery from "./pages/Gallery";
import Hints from "./pages/Hints";
import Docs from "./pages/Docs";

import Slack from "./module/slack"
import {
    withRouter
} from 'react-router-dom'

import getUrlParam from "./tools/getUrlParam"


import React, {useRef,useState} from 'react';
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
import HomeIcon from '@material-ui/icons/Home';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DatabaseIcon from '@material-ui/icons/Cloud';
import MenuIcon from '@material-ui/icons/Menu';
import BookIcon from '@material-ui/icons/Book';
import PlayIcon from '@material-ui/icons/PlayArrow';
import AppsIcon from '@material-ui/icons/Apps';
import GalleryIcon from '@material-ui/icons/PhotoLibrary';
import HintsIcon from '@material-ui/icons/Info';
import DynamicFeedIcon from '@material-ui/icons/Pages';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {
    makeStyles,
    useTheme
} from '@material-ui/core/styles';
import { FaGithub,FaSlack } from 'react-icons/fa';

import AppFooter from "./AppFooter"
import { useEffect } from 'react';

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
        background: "rgba(0,0,0,0.618)",
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
    var notifyRef = useRef(null)
    var reloadRef = useRef(null)

    function handleAnchor(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    }
    function openGitHub() {
      window.open("https://github.com/nucleome")
    }
    function openDocs() {
      //TODO
      window.open("https://nb-docs.readthedocs.io")
    }
    function openTutorials() {
        window.open("https://docs.google.com/document/d/11IU0I5kleg0y9R-k285_o9dt9W67iaBPty9FYsgEWaw/edit?usp=sharing")
    }
    /*
    function openApps() {
      window.open("/static/store")
    }
    function openStories() {
      window.open("/static/journal")
    }
    */
    function openSlack() { // Modal Join or Enter
      window.open("https://join.slack.com/t/nucleome-browser/shared_invite/enQtNzY3NzQzOTczODc0LTZmYmNhYmJmYWVjZWMzNDY4MTQ5NmNmZmVmZTJhMzgyNjQwMGFiMDQ4ZWMwOWRjYjkzZjVjYjNmY2FkNGYxNWM")
    }
    function openGallery() {
        handleLink("examples")()
    }
    function openHome() {
        handleLink("home")()
    }

    function openHints() {
        handleLink("hints")()
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
        return function handle(rest) {
            setNav(d)
            var u = "/entry/" + d //TODO 
            if (arguments.length > 0) {
                u =  u + "/__" + rest
            }
            props.history.push(u)
        }

    }
    function handleNav(d) {
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
            var u = "/entry/" + d //TODO 
            props.history.push(u)
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
    var newWorker
    //Change it Notification Bar
    reloadRef.current.addEventListener('click', function() {
        newWorker.postMessage({
            action: 'skipWaiting'
        });
    });
    navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        })
        .then(function(reg) {
            if (reg.waiting && reg.active) {
                newWorker = reg.waiting
                notifyRef.current.style.display = null
            } else {
                reg.addEventListener('updatefound', () => {
                newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    switch (newWorker.state) {
                        case 'installed':
                            if (navigator.serviceWorker.controller) {
                                notifyRef.current.style.display = null
                            }
                            break;
                        }
                    });
                })
            }
            setSwInited(true)
            getVersion()
        })
        .catch(function(error) {
            console.log("Failedegister ServiceWorker", error);
         });

    let refreshing;
        navigator.serviceWorker.addEventListener('controllerchange', function() {
            if (refreshing) return;
            window.location.reload();
            refreshing = true;
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
              {label:"Browser",id:'browser', icon:<PlayIcon />},
              {label:"Session Space",id:'session', icon:<ViewCompactIcon />},
              /*
              {label:"Panel Space",id:'space', icon:<DashboardIcon />},
              */
              ].map((d, index) => (
              <ListItem button key={d.id} onClick={handleNav(d.id)}>
                <ListItemIcon>{d.icon}</ListItemIcon>
                <ListItemText primary={d.label} />
             </ListItem>
            ))}
          </List>
 
      <Divider />

    </div>
    );
    const [page,setPage] = useState("home")
    const [rest,setRest] = useState()
    useEffect(function(){
        initVersion()
        var p = getUrlParam("page")
        var r = getUrlParam("rest")
        if (p == null) {
        } else {
            setPage(p)
            if (r == null) {
                handleLink(p)()
            } else {
                setRest(r)
                handleLink(p)(r)
            }
        }
    },[])

    return (
        <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} >
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

    <Tooltip title="Home">  
    <IconButton
            color="inherit"
            aria-label="Home"
            edge="start"
            onClick={openHome}
            >
             <HomeIcon/>
        </IconButton>
    </Tooltip>

   <Tooltip title="Examples">  
    <IconButton
            color="inherit"
            aria-label="Gallery"
            edge="start"
            onClick={openGallery}
            >
             <GalleryIcon/>
        </IconButton>
    </Tooltip>
    {/* 
    //TODO : PUt These to Develop Mode
   <Tooltip title="Hints">  
    <IconButton
            color="inherit"
            aria-label="Hints"
            edge="start"
            onClick={openHints}
            >
             <HintsIcon/>
        </IconButton>
    </Tooltip>
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
    <Tooltip title="Customized Web Pages">  
    <IconButton
            color="inherit"
            aria-label="Stories"
            edge="start"
            onClick={openStories}
            >
             <DynamicFeedIcon/>
        </IconButton>
    </Tooltip>
    */}
    <Tooltip title="Tutorials">  
    <IconButton
            color="inherit"
            aria-label="Hints"
            edge="start"
            onClick={openTutorials}
            >
             <HintsIcon/>
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
  <Tooltip title="Slack">
    <IconButton color="inherit" edge="start" aria-label="Slack Home" onClick={openSlack}>
        <FaSlack/>        
    </IconButton>
    </Tooltip>
    <Tooltip title="Source Code">
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
        <div className={classes.notification} ref={notifyRef} style={{display:"none",fontSize:"18px",height:"30px"}}>
            A new version of this app is available. Please Click <Button various="outlined" ref={reloadRef}>Update</Button> to update.
        </div>
          <Switch>
          <Route path='/entry/home'  component={() => <Home version={version}/>}/>
          <Route exact path='/entry/' component={() => <Home version={version}/>}/>
          <Route exact path='/entry/null' component={() => <Home version={version}/>}/>
          <Route exact path='/entry/space' component={() => <Space version={version}/>}/>
          <Route exact path='/entry/session' component={() => <Session version={version}/>}/>
          <Route exact path='/entry/examples' component={() => <Gallery version={version}/>}/>
          <Route exact path='/entry/hints' component={() => <Hints version={version}/>}/>
          <Route path='/entry/docs/:markdown' component={() => <Docs match={props.match} rest={rest} version={version}/>}/>
         /* <Route exact path='/entry/portal' component={() => <Portal version={version}/>}/> */
        </Switch>
        </main>
       <AppFooter classes = {classes}/> 
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
