import React from 'react';
import { Route } from 'react-router';

// Components
import App from './NewsApp';

export default (
	<Route path="/" component={App}>
	  <Route path="items/:tag" component={App} />
	</Route>
);