import _ from 'lodash';
import 'whatwg-fetch';

const API_URL = API_URL || 'http://ruminator.herokuapp.com';

export const createStore = (reducer, asyncFetch) => {
	let state;
	let listeners = [];

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach(listener => listener());
	}

	// I'll just hack in a quick async dispatch method here.
	const delayDispatch = (action) => {
		asyncFetch(action.tag).then(x => {
			action.data = x;
			dispatch(action);
		});
	}

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter(l => l !== listener);
		}
	}

	dispatch({});

	return {getState, dispatch, delayDispatch, subscribe};
}

class Store {
	constructor(endpoint) {
		this.apiURL = endpoint;
		this.items = [];
		this.tags = [];
		this.currentTag = '';
		this.listener = [];
		this.fetching = false;
	}
	convertDate(item) {
		item.date = new Date(item.date);
		return item;
	}
	constructItemList() {
		this.items = _.uniqBy(this.items, 'itemID') || []
		this.items = this.items.map(this.convertDate);
	  	// this.items = _.sortBy(this.items, 'date');
	  	this.items.reverse();  	
	}
	set(obj) {
		this.items = obj.items;
		this.constructItemList();
		this.tags = obj.tags || [];
		this.currentTag = obj.currentTag || '';
		this.fetching = false;
	}
	update(data) {
		this.items = this.items.concat(data.items);
		this.constructItemList();		
	  	this.tags = data.tags || [];
	  	this.currentTag = data.currentTag;
		this.fetching = false;
	}
	notify() {
		this.listener.forEach(x=> x());
	}
	setListener(fn) {
		this.listener.push(fn);
	}
	getState() {
		return {
			items: this.items,
			tags: this.tags,
			currentTag: this.currentTag,
		}
	}
	fetchItems(fetchTag, oldestID) {
		fetchTag = fetchTag || '';
		oldestID = oldestID || null;
		this.fetching = true;
		fetch(`${this.apiURL}${fetchTag ? '/items/' + fetchTag + '' : ''}${oldestID ? '?&oldest=' + oldestID: ''}`)
		  .then(res => res.json())
		  .then(json => {
		    json.items = json.items.map(x => {
		      x.tags = JSON.parse(x.tags);
		      return x;
		    })
		    return json
		  })
		  .then((data) => {
		  	if (this.currentTag !== fetchTag) {
		  		data.currentTag = fetchTag;
				this.set(data);
		  	} else {
		  		this.update(data);
		  	}
			this.notify();
		  });
	}
	fetchMore() {
		let oldestID = null;
		if (this.items.length) {
			oldestID = this.items[this.items.length-1].itemID;
		}
		this.fetchItems(this.currentTag, oldestID);
	}
}

const store = new Store(API_URL);

export default store;