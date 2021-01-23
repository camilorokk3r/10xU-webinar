import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './pages/welcome';
import Login from './pages/login';
import Signup from './pages/signup';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
        </Switch>
      </Router>
      
    </React.Fragment>
    
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));