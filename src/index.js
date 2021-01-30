import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import { 
  FirebaseAuthProvider
} from '@react-firebase/auth';
import { FirestoreProvider } from "@react-firebase/firestore";

import { config } from "./config/config";


import Welcome from './pages/welcome';
import Login from './pages/login';
import Signup from './pages/signup';
import ToDo from './pages/todo';


function App() {
  
  

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <FirestoreProvider {...config} firebase={firebase}>
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
            
              <Route path="/todo">
                <ToDo/>
              </Route>

              
            </Switch>
          </Router>
          
        </React.Fragment>
      </FirestoreProvider>
    </FirebaseAuthProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));