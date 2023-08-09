import React from 'react';
import ReactDOM from 'react-dom';
import { AzureAD } from 'react-aad-msal';
 
import App from './App';
import { authProvider } from './authProvider';
 
ReactDOM.render(
    <App />,
  document.getElementById('root'),
);