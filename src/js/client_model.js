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


socket.on('nxws items', function(msg) {
	var newItem = JSON.parse(msg);
  newItem.date = new Date(newItem.date);
  if (newItem.constructor == Object) newItem = [newItem];
  newItem[0].fetchDate = new Date();
  var currentNews = newsItems.get();
  var totalNews = newItem.concat(currentNews);
  newsItems.set(totalNews);
});

socket.on('nxws readers', function(msg) {
  numberOfReaders.set(Number(msg));
});

socket.on('nxws sources', function(jsonSources) {
  var sources = JSON.parse(jsonSources);
  sourceList.set(sources);
});

socket.on('nxws top10', function(msg) {
	var newTopWords = JSON.parse(msg);
  topWords.set(newTopWords);
});
