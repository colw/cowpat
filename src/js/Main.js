import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router'

import NewsApp from './NewsApp';
import HowCow from './HowCow'

import store from './store';
import routes from './routes';

store.setListener(mainRender);

function mainRender() {

	const createComponent = (serverProps) => {
	  return function(Component, props) {
		console.debug(props);
	    return <Component {...serverProps} {...props} />
	  }
	}
	ReactDOM.render((
	  <Router history={hashHistory} routes={routes} createElement={createComponent({store: store})} />
	), document.getElementById('ReactMountPoint'));
}

mainRender();