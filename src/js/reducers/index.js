import { combineReducers } from 'redux'
import { REQUEST_NEWS, RECEIVE_NEWS } from '../actions';

const initialState = {
	items: [],
	tags: [],
	currentTag: '',
	fetching: false,
};

const newsItems = (state = initialState, action) => {
console.debug(state, action);
	switch(action.type) {
		case REQUEST_NEWS:
		  return {
		  	...state,
		  	fetching: true
		  };		
		case RECEIVE_NEWS: 
		  return {
		  	...state,
		  	fetching: false,
		  	...action.data
		  };
		default: return state;
	}
};

// const rootReducer = combineReducers({
//   newsItems,
// });
// export default rootReducer;

export default newsItems;
