import ObservableThing from './ObservableThing';

var io = require("socket.io-client");

var  socket = io(FEEDSRC);

export var newsItems = new ObservableThing([]);
export function getStateFromNewsItems() {
  return newsItems.get();
}

export var numberOfReaders = new ObservableThing(Number(0));
export function getStateFromNumberOfReaders() {
  return numberOfReaders.get();
}

export var sourceList = new ObservableThing([]);
export function getStateFromSourceList() {
  return sourceList.get();
}

export var topWords = new ObservableThing([]);
export function getStateFromTopWords() {
  return topWords.get();
}


function isinArray(arr, elt) {
  if (!arr) {
    return false;
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].guid === elt.guid) {
      return true;
    }
  }
  return false;
}


socket.on('nxws items', function(msg) {
	var newItem = JSON.parse(msg);
  console.debug('items', msg);

  // console.debug(typeof newItem, newItem.guid);

  if (isinArray(newsItems.get(), newItem)) {
    console.debug('not a new item');
    return;
  }

  newItem.date = new Date(newItem.date);
  newItem.fetchDate = new Date();

  var currentNews = newsItems.get() || [];
  currentNews.push(newItem);
  newsItems.set(currentNews);
});

socket.on('nxws readers', function(msg) {
  numberOfReaders.set(Number(msg));
});

socket.on('nxws sources', function(jsonSources) {
  var sources = JSON.parse(jsonSources);
  sourceList.set(sources);
});

socket.on('nxws top10', function(msg) {
  console.debug('top10', msg);
	var newTopWords = JSON.parse(msg);
  topWords.set(newTopWords);
});
