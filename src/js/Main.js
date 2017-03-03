import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers'
import App from './App'

import "../index.html";
import './favicons.js'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

const render = () => {
	ReactDOM.render(<Router><App store={store} /></Router>, document.getElementById('app'));	
}

store.subscribe(render);

render();
