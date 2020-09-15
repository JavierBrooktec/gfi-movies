import React, {useContext, useState} from 'react';

import { fakeAuth } from './helpers'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Favourites from './pages/Favourites';
import Film from './pages/Film';
import NoMatch from './pages/NoMatch';


import './App.scss';



function PrivateRoute({ children, ...rest }) {


  const {setLogged} = useContext(LogedContext)

  const [fine] =fakeAuth();

  setLogged(fine);

  return (
    <Route
      {...rest}
      render={({ location }) =>
      fine ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function NormalRoute({ children, ...rest }) {


  const {setLogged} = useContext(LogedContext)

  const [fine,] =fakeAuth();

  setLogged(fine);

  return (
    <Route
      {...rest}
      render={() =>
          children
      }
    />
  );
}

export const LogedContext = React.createContext({logged: false, setLogged: (e) => {}, user: '', setUser: (user:string) => {}});


function App() {

  const [logged, setLogged]:any = useState(false);

  const currentuser = window.sessionStorage.getItem('user');


  

  
  const [user, setUser]:any[] = useState((currentuser !== 'undefined'  && currentuser !== null) ? currentuser : '');


  return (
    <LogedContext.Provider value={{logged, setLogged, user, setUser}}>
      <div className="App">
        <Router>
          <Switch>
            <NormalRoute exact path="/">
              <Home />
            </NormalRoute>
            <NormalRoute path="/movies">
              <Home />
            </NormalRoute>
            <PrivateRoute path="/favourites">
              <Favourites />
            </PrivateRoute>
            <NormalRoute path="/login">
              <Login />
            </NormalRoute>
            <NormalRoute path="/SignUp">
              <SignUp />
            </NormalRoute>
            <NormalRoute path="/film/:id">
              <Film />
            </NormalRoute>

            <NormalRoute path="*">
              <NoMatch />
            </NormalRoute>
          </Switch>
        </Router>
      </div>
    </LogedContext.Provider>
  );
}

export default App;
