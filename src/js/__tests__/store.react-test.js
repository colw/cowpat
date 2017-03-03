// NewsItem.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';

import { createStore } from '../store';

describe('Basic reducer tests', () => {
	
	const reducer = (state = 0, action) => {
		switch (action.type) {
			case 'increment': return state + 1;
			case 'decrement': return state - 1;
			default: return state;
		}
	}

	test('Should return initial state', () => {
	  const s = createStore(reducer);	        
	  expect(s.getState()).toEqual(0);
	});

	test('Should increment counter by 1', () => {
	  const s = createStore(reducer);
	  s.dispatch({type: 'increment'});	        
	  expect(s.getState()).toEqual(1);
	});

	test('Should decrement counter by 1', () => {
	  const s = createStore(reducer);
	  s.dispatch({type: 'decrement'});	        
	  expect(s.getState()).toEqual(-1);
	});	

});