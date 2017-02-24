import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import store from './store';
import { capitaliseEachWord } from './tools';

import Header from './HeaderNav';
import NewsList from './NewsList';

require('../scss/normalize.css');
require('../fontello/css/fontello.css');
require('../scss/style.scss');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      heading: ''
    };
  }

  componentDidMount() {
    store.setListener(this.setHeading);
    this.fetchHeading();
  }
  
  fetchHeading = () => {
    store.fetchItems();
  }

  setHeading = () => {
    const state = store.getState();
    this.setState({heading: state.currentTag});
  }
  
  renderNewsList = (props) => {
    return (
      <NewsList
        loading={this.state.loading}
        newsItems={this.props.store.items}
        {...props} />
    )
  }

  renderHeader = (props) => {
    let title = this.state.heading !== '' ?
      `‘${capitaliseEachWord(this.state.heading)}’` : 'Ruminant';
    return (
      <Header
        title={title}
        items={this.props.store.tags}
        {...props} />
    )
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route render={this.renderHeader} />
          <Route path={'/'} exact={true} render={this.renderNewsList} />
          <Route path={'/items/:tag'} render={this.renderNewsList} />
        </div>
      </Router>
    );
  }
}

export default App;