import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';
import Home from "./Home"

function HomeIndex(){
 return (
        <Switch>
          <Route exact path='/static/build/about'  component={Home}/>
          <Route exact path='/static/build'  component={Home}/>
        </Switch>

    )
}

export default HomeIndex
