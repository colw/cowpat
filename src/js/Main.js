import ReactDOM from 'react-dom';
import React from 'react';
import App from './App'
import store from './store';

import "../index.html";
import './favicons.js'

ReactDOM.render(<App store={store} />, document.getElementById('app'));