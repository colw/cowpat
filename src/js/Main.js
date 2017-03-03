import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'whatwg-fetch';
import { uniqBy } from 'lodash';

import App from './App'
import { createStore } from './store';

import "../index.html";
import './favicons.js'

const constructItem = (item) => {
  item.tags = JSON.parse(item.tags);
  item.date = new Date(item.date);
  return item;
}

const orderItems = (data) => {
	data.items = data.items.map(constructItem)
	data.items = uniqBy(data.items, 'itemID') || []
	// data.items = _.sortBy(data.items, 'date');
	data.items.reverse();
	return data;
}

const fetchItems = (fetchTag, oldestID) => {
	fetchTag = fetchTag || '';
	oldestID = oldestID || null;
	return fetch(`${API_URL}${fetchTag ? '/items/' + fetchTag + '' : ''}${oldestID ? '?&oldest=' + oldestID: ''}`)
	  .then(res => res.json())
	  .then(orderItems)
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
