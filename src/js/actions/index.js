import 'whatwg-fetch';
import { uniqBy } from 'lodash';

export const REQUEST_NEWS = 'REQUEST_NEWS'
export const RECEIVE_NEWS = 'RECEIVE_NEWS'

const constructItem = (item) => {
  item.tags = JSON.parse(item.tags);
  item.date = new Date(item.date);
  return item;
}

const sortAndOrderItems = (data) => {
	data.items = data.items.map(constructItem)
	data.items = uniqBy(data.items, 'itemID') || []
	// data.items = _.sortBy(data.items, 'date');
	data.items.reverse();
	return data;
}

export const requestNews = tag => ({
  type: REQUEST_NEWS,
  tag,
})

export const receiveNews = (tag, data) => ({
  type: RECEIVE_NEWS,
  data,
})

export const fetchNews = tag => dispatch => {
  dispatch(requestNews(tag))
  return fetch(`${API_URL}${tag ? '/items/' + tag + '' : ''}`)
    .then(response => response.json())
    .then(sortAndOrderItems)
    .then(json => dispatch(receiveNews(tag, json)))
}
