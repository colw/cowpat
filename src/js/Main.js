import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router'

import NewsApp from './NewsApp';
import HowCow from './HowCow'


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={NewsApp}>
      <Route path='/about' component={HowCow} />
    </Route>
  </Router>
), document.getElementById('ReactMountPoint'));
