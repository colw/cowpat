import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';

import { fetchNews, requestNews, receiveNews } from './actions'

import { capitaliseEachWord, getTagFromPath } from './tools';
import Header from './HeaderNav';
import NewsList from './NewsList';

import '../scss/normalize.css';
import '../fontello/css/fontello.css';
import '../scss/style.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      heading: ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const t = getTagFromPath();
    this.props.store.dispatch(fetchNews(t));
  }
  
  renderNewsList = (props) => {
    return (
      <NewsList
        loading={this.state.loading}
        newsItems={this.props.store.getState().items}
        {...props} />
    )
  }

  renderHeader = (props) => {
    const tag = this.props.store.getState().currentTag || 'Ruminant';
    let title = `‘${capitaliseEachWord(tag)}’`;
    return (
      <Header
        title={title}
        items={this.props.store.getState().tags}
        {...props} />
    )
  }

  render() {
    return (
      <div className="App">
        <Route render={this.renderHeader} />
        <Route path={'/'} exact={true} render={this.renderNewsList} />
        <Route path={'/items/:tag'} render={this.renderNewsList} />
      </div>
    );
  }
}

export default withRouter(App);
