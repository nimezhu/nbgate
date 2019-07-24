import {
    Route,
    Switch,
} from 'react-router-dom';
import HomeIndex from './pages/HomeIndex';

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

import HomeIcon from '@material-ui/icons/Home';
import WebIcon from '@material-ui/icons/Web';
import MenuIcon from '@material-ui/icons/Menu';
import BookIcon from '@material-ui/icons/Book';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
    makeStyles,
    useTheme
} from '@material-ui/core/styles';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
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
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


function ResponsiveDrawer(props) {
    const {
        container,
    } = props;
    const theme = useTheme()
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    var a = window.location.href.split('/')
    const [nav, setNav] = React.useState(a[5]||"about"); 

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    function handleLink(d) {
        return function handle() {
            setNav(d)
            props.history.push("./" + d) 
        }

    }

    const drawer = (
        <div>
      <div className={classes.toolbar}> 
        <div className={classes.drawerHeader}>
      <Typography variant="h6" color="primary" >Nucleome Browser</Typography>
              </div>
      </div>
      <Divider />
        <List>
            {[
              {id:'about',icon:<HomeIcon />},
              {id:'documentation', icon:<BookIcon />},
              {id:'lab',icon:<WebIcon />},
              ].map((d, index) => (
              <ListItem button key={d.id} onClick={handleLink(d.id)}>
                <ListItemIcon>{d.icon}</ListItemIcon>
                <ListItemText primary={d.id} />
             </ListItem>
            ))}
          </List>
 
      <Divider />
    </div>
    );

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
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        h{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
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
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
           {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}>
         Main Header
        </div>
          <Switch>
          <Route path='/static/build/about' component={HomeIndex}/>
          <Route exact path='/static/build/' component={HomeIndex}/>
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
