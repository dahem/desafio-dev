import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Loading from './components/Loading';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0();


  if (isLoading) return <Loading />

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const UnProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) return <Loading />

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

function App() {
  return (
    <div className="fit App">
      <BrowserRouter>
        <Switch>
          <UnProtectedRoute exact path="/login" component={Login}/>
          <ProtectedRoute exact path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
