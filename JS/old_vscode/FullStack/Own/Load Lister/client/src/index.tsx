import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const url = 'https://load-lister.herokuapp.com'
const local = 'http://localhost:4000'

axios.defaults.baseURL = '/api'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

