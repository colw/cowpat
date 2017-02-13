import React from 'react';
import moment from 'moment';
// import { Link } from 'react-router';

import Menu from './menu';
import Header from './headerbar';
// import NewsSearchBar from './NewsSearchBar';
import NewsWordList from './NewsWordList';
import NewsList from "./NewsList";
import NewsCow from "./NewsCow";

require('../scss/normalize.css');
// require('../scss/skeleton.css');
// import 'purecss/build/pure-min.css';
require('../scss/style.scss');
require('../scss/fa/scss/font-awesome.scss');


function capitalise(t) {
  return t[0].toUpperCase() + t.slice(1);
}

function capitaliseEachWord(ws) {
  // console.debug(ws);
  return decodeURI(ws).split(' ').map(capitalise).join(' ');
}

function getTagFromPath() {
  const path =  window.location.pathname.split('/');
  // console.log(path, window.location.href, window.location.pathname);
  let tag = null;
  if (path.length > 2 ) {
    tag = path[2];
  }
  return tag;
}

export default class NewsApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        filterText: ''
      , filterTags: []
      , showAbout: false
      , loading: false
    };
  }

  fetchItems(tag) {
      // const lastID = this.props.store.items[this.props.store.items.length-1].itemID;
      this.setState({loading: false}, () => {
        this.props.store.fetchItems(tag);        
      })
  }

  componentWillUpdate(nextProps) {
    // console.debug(this.props, nextProps)
    if (nextProps.params.tag !== this.props.params.tag) {
      // console.debug(nextProps.params.tag || '');
      this.fetchItems(nextProps.params.tag || '');
    }
  }

  componentDidMount () {
    const t = getTagFromPath();
    this.fetchItems(t);
  }

  render() {
    let loadMore = null;
    if (this.props.store.items.length) {
      loadMore = <div key={2} className="load-more-wrapper" onClick={this.props.store.fetchMore.bind(this.props.store)}><span className="load-more-button"><i className="fa fa-plus"></i></span></div>;
    }

    let title = 'Ruminant';
    if (this.props.store.currentTag !== '') {
      title = `‘${capitaliseEachWord(this.props.store.currentTag)}’`;
    }

    return (
      <div id="MainContent">
        <div id="headerInfo">
          <Header title={title} open={this.state.menuOpen} items={this.props.store.tags} current={this.props.store.currentTag} selectItem={this.handleSelectItem} iconToggle={this.toggleIcon} />
        </div>
        <div id="mainList">
        {!this.props.store.fetching ? 
          ([<NewsList key={1} loading={this.state.loading} newsItems={this.props.store.items} filterText={this.state.filterText.toLowerCase()} filterTags={this.state.filterTags}/>, loadMore]) : <div>Loading</div>
        }
        </div>
      </div>
		);
	}
};
