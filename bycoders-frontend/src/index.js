import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_OAUTH_DOMAIN}
      clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_OAUTH_AUDIENCE}
      scope="openid profile email"
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
