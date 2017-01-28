import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

// import {newsItems,
//         numberOfReaders,
//         sourceList,
//         topWords,
//         getStateFromNewsItems,
//         getStateFromNumberOfReaders,
//         getStateFromSourceList,
//         getStateFromTopWords,
//       } from './client_model';

import NewsSearchBar from './NewsSearchBar';
import NewsTagList from './NewsTagList';
import NewsWordList from './NewsWordList';
import NewsInfo from "./NewsInfo";
import NewsItem from "./NewsItem";
import NewsList from "./NewsList";
import NewsCow from "./NewsCow";
import HowCow from './HowCow';

require('../scss/style.scss');
// require('purecss/build/pure.css');

export default class NewsApp extends React.Component {

  constructor(props) {
    super(props);
    console.debug(props);
    this.state = {
        filterText: ''
      , filterTags: []
      , minutes: 0
      , showAbout: false
    };
  }

  tick() {
    this.setState({minutes: this.state.minutes + 1});
  }

  fetchItems(tag) {
      // const lastID = this.props.store.items[this.props.store.items.length-1].itemID;
      this.props.store.fetchItems(null, tag);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.tag !== this.props.params.tag) {
      this.fetchItems(this.props.params.tag);
    }
  }

  componentWillMount () {
    this.intervals = [];
  }

  setInterval () {
    this.intervals.push(setInterval.apply(null, arguments));
  }

  componentWillUnmount () {
    this.intervals.map(clearInterval);
  }

  componentDidMount () {
   this.fetchItems();
  }

	handleUserInput (filterText) {

    var modFilterText = filterText.toLowerCase();

    if (modFilterText[0] === '-') {
      this.setState({filterText: filterText});
      return;
    }
    var tags = this.state.filterTags;
    if (modFilterText.length > 0) {
      tags = tags.concat(modFilterText);8
    }
    var newFilteredNewsList = this.filterListWithTags(this.state.newsItems, tags);

		this.setState({filterText: filterText, filteredNewsItems: newFilteredNewsList});
	}

  handleSubmit (filterText) {
    this.handleUserInput(filterText); // FIX This is here in case a user clicks
                                      // a top tag. Usually this is called
                                      // as a user types.
                                      // It also means it is run twice
                                      // if a user types new tag in.
    var newTags;
    if(filterText === '')
      return;

    if (filterText[0] !== '-') {
      newTags = this.state.filterTags.concat(filterText.toLowerCase());
      this.setState({filterText: '', filterTags: newTags});
      return;
    } else {
      newTags = this.state.filterTags.concat(filterText.toLowerCase());
      var newFilteredNewsList = this.filterListWithTags(this.state.newsItems, newTags);
      this.setState({filterText: '', filterTags: newTags, filteredNewsItems: newFilteredNewsList});
      return;
    }
  }

  handleTagClick (tagName) {
    var tags = this.state.filterTags.filter(x => x != tagName);

    if (this.state.filterText.length > 0)
      tags = tags.concat(this.state.filterText);

    var newFilteredNewsList = this.filterListWithTags(this.props.store.items, tags);
    this.setState({filterTags: tags, filteredNewsItems: newFilteredNewsList});
  }

  filterListWithTags (list, tags) {
    if (list.length === 0) {
      return [];
    } else if (tags.length === 0) {
      return list;
    } else if (tags[0] === '-') { /* move empty string check elsewhere */
      return this.filterListWithTags(list, tags.slice(1));
    } else {

      var searchText = x => {
        return  ((x.title?x.title:'')
                + (x.metatitle?x.metatitle:'')
                + (x.metalink?x.metalink:'')).toLowerCase();
      }

      var filterContains = (curTag, x) => {
        return x => {
          var xt = searchText(x);
          return xt.indexOf(curTag) !== -1
        };
      };

      var filterContainsNot = (curTag, x) => {
        return x => {
          var xt = searchText(x);
          return xt.indexOf(curTag) === -1
        };
      };

      var curTag = tags[0];
      var filteredList;
      if (curTag[0] === '-') {
        curTag = curTag.slice(1);
        filteredList = list.filter(filterContainsNot(curTag));
      } else {
        filteredList = list.filter(filterContains(curTag));
      }

      return this.filterListWithTags(filteredList, tags.slice(1));
    }
  }

	render() {
    return (
      <div id="MainContent">
        <div id="headerInfo">
          <NewsCow />
          <NewsSearchBar onUserInput={ this.handleUserInput.bind(this) } filterText={this.state.filterText} onFilterSubmit={this.handleSubmit.bind(this)}/>
          <NewsTagList filterTags={this.state.filterTags} onTagClick={this.handleTagClick.bind(this)}/>
          <NewsWordList wordList={this.props.store.tags} onTagClick={this.handleSubmit.bind(this)}/>
        </div>
        <div id="mainList">
          {this.props.children ?
            this.props.children :
            <NewsList newsItems={this.props.store.items} filterText={this.state.filterText.toLowerCase()} filterTags={this.state.filterTags}/>
          }
        </div>
      </div>
		);
	}
};
