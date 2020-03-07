import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Header from "./containers/header/header";
import Homepage from "./containers/homepage/homepage";
import Dashboard from "./containers/dashboard/dashboard";

function App() {
  return (
       <Router>
           <Header />
           <Switch>
               {/* homepage */}
               <Route exact path="/">
                   <Homepage />
               </Route>
               <Route path="/dashboard">
                   <Dashboard />
               </Route>
           </Switch>
      </Router>

  );
}

export default App;
