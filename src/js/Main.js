import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router'

import store from './store';
import routes from './routes';

import "../index.html";

store.setListener(mainRender);

function mainRender() {

	const createComponent = (store) => {

      // let props = store.getState();

	  return function(Component, props) {
	    return <Component {...store} {...props} />
	  }
	}
	ReactDOM.render((
	  <Router history={browserHistory} routes={routes} createElement={createComponent({store: store})} />
	), document.getElementById('ReactMountPoint'));
}

mainRender();