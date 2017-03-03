import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'whatwg-fetch';
import _ from 'lodash';

import App from './App'
import { createStore } from './store';

import "../index.html";
import './favicons.js'

const fetchItems = (fetchTag, oldestID) => {
	fetchTag = fetchTag || '';
	oldestID = oldestID || null;
	return fetch(`${API_URL}${fetchTag ? '/items/' + fetchTag + '' : ''}${oldestID ? '?&oldest=' + oldestID: ''}`)
	  .then(res => res.json())
	  .then(json => {
	    json.items = json.items.map(x => {
	      x.tags = JSON.parse(x.tags);
	      x.date = new Date(x.date);
	      return x;
	    })
			json.items = _.uniqBy(json.items, 'itemID') || []
	  	// json.items = _.sortBy(json.items, 'date');
	  	json.items.reverse();
	    return json;
	  })
}

const initialState = {
	items: [],
	tags: [],
	currentTag: '',
	fetching: false,
}

const newsReducer = (state = initialState, action) => {
	console.debug('reducer', state, action);
  return {...state, ...action.data};
}

const store = createStore(newsReducer, fetchItems);

const render = () => {
	ReactDOM.render(<Router><App store={store} /></Router>, document.getElementById('app'));	
}

store.subscribe(render);

render();
