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
