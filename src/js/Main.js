import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router'

import store from './store';
import routes from './routes';

import "../index.html";
import './favicons.js'

store.setListener(mainRender);

function mainRender() {
	const createComponent = (store) => {
	  return function(Component, props) {
	    return <Component {...store} {...props} />
	  }
	}
	ReactDOM.render((
	  <Router history={browserHistory} routes={routes} createElement={createComponent({store: store})} />
	), document.getElementById('app'));
}

mainRender();
