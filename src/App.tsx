import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Favourites from './pages/Favourites';
import Film from './pages/Film';
import NoMatch from './pages/NoMatch';


import './App.scss';



function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/movies">
            <Home />
          </Route>
          <Route path="/favourites">
            <Favourites />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/film/:id">
            <Film />
          </Route>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
