import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App'
import store from './store';

import "../index.html";
import './favicons.js'

const render = () => {
	ReactDOM.render(<Router><App store={store} /></Router>, document.getElementById('app'));	
}

store.setListener(render);

render();
