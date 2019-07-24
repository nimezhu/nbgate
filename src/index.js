import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Switch
} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import App from './App';
//import * as serviceWorker from './serviceWorker';
if (navigator.serviceWorker) {
    console.log("ServiceWorkersSupported");
    navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        })
        .then(function(reg) {
            console.log("ServiceWorkerstered", reg);
            //TODO Get Version And Set Version 
        })
        .catch(function(error) {
            console.log("Failedegister ServiceWorker", error);
        });
} else {
  console.log("Service Worker Not Supported")
}

ReactDOM.render((
  <ThemeProvider theme={theme}>
    <BrowserRouter >
    <CssBaseline />
        <Switch>
          <Route path='/static/build/' component={App}/>
        </Switch>

    </BrowserRouter>
  </ThemeProvider>
), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


