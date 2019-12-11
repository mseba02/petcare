import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import Header from "./containers/header";

function App() {
  return (
       <Router>
           <Switch>
               <Header />

               <Route path="/">

               </Route>
           </Switch>
      </Router>
  );
}

export default App;
