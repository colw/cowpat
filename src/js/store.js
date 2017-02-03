function getTagFromPath() {
	const path =  window.location.pathname.split('/');
	console.log(path, window.location.href, window.location.pathname);
	let tag = null;
	if (path.length > 2 ) {
		tag = path[2];
	}
	return tag;
}

class Store {
	constructor() {
		this.items = [];
		this.tags = [];
		this.currentTag = '';
		this.listener = () => {};
		this.fetching = false;
	}
	set(obj) {
		this.items = obj.items || [];
		this.tags = obj.tags || [];
		this.currentTag = obj.currentTag || '';
		this.fetching = false;
	}
	update(data) {
	  	this.items = this.items.concat(data.items);
	  	this.tags = data.tags || [];
	  	this.currentTag = data.currentTag;
		this.fetching = false;
	}
	notify() {
		this.listener();
	}
	setListener(fn) {
		this.listener = fn;
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
		fetch(`${FEEDSRC}${fetchTag ? '/items/' + fetchTag + '' : ''}${oldestID ? '?&oldest=' + oldestID: ''}`)
		  .then(res => res.json())
		  .then(json => {
		    json.items = json.items.map(x => {
		      x.tags = JSON.parse(x.tags);
		      return x;
		    })
		    return json
		  })
		  .then((data) => {
	  		console.log(this.currentTag !== fetchTag ? 'set' : 'updated');
	  		console.log(this.currentTag, fetchTag);
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

const store = new Store();

export default store;