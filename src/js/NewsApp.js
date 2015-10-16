import ReactDOM from 'react-dom';
import React from 'react';
import moment from 'moment';

import {newsItems,
        numberOfReaders,
        sourceList,
        getStateFromNewsItems,
        getStateFromNumberOfReaders,
        getStateFromSourceList} from './client_model';

import NewsSearchBar from './NewsSearchBar';
import NewsTagList from './NewsTagList';
import NewsInfo from "./NewsInfo";
import NewsItem from "./NewsItem";
import NewsList from "./NewsList";
import NewsCow from "./NewsCow";
import HowCow from './HowCow';

require('../scss/style.scss');

export default class NewsApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        filterText: ''
      , filterTags: []
      , newsItems: getStateFromNewsItems()
      , filteredNewsItems: []
      , numberOfReaders: getStateFromNumberOfReaders()
      , sourceList: getStateFromSourceList()
      , minutes: 0
      , showAbout: false
    };
  }

  tick() {
    this.setState({minutes: this.state.minutes + 1});
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
    newsItems.setChangeListener(this.onStorageChange.bind(this));
    numberOfReaders.setChangeListener(this.onReaderChange.bind(this));
    sourceList.setChangeListener(this.onSourceListChange.bind(this));
    this.setInterval(this.tick, 60000);
    this.setState({filteredNewsItems: this.state.newsItems.slice()});
  }

  onStorageChange () {
    var newNewsList = getStateFromNewsItems();
    var tags = this.state.filterTags;
    if (this.state.filterText.length > 0) {
      tags = tags.concat(this.state.filterText);
    }
    var newFilteredNewsList = this.filterListWithTags(newNewsList, tags);
    this.setState({newsItems: newNewsList, filteredNewsItems: newFilteredNewsList}); //woop
  }

  onReaderChange () {
    this.setState({numberOfReaders: getStateFromNumberOfReaders()});
  }

  onSourceListChange () {
    var s = getStateFromSourceList();
    this.setState({sourceList: s});
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
    var tags = this.state.filterTags.filter(function(x) {return x != tagName;});
    
    if (this.state.filterText.length > 0)
      tags = tags.concat(this.state.filterText);
    
    var newFilteredNewsList = this.filterListWithTags(this.state.newsItems, tags);
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
      
      var searchText = function(x) {
        return  ((x.title?x.title:'') 
                + (x.metatitle?x.metatitle:'')
                + (x.metalink?x.metalink:'')).toLowerCase();
      }
      
      var filterContains = function(curTag, x) {
        return function(x) {
          var xt = searchText(x);
          return xt.indexOf(curTag) !== -1
        };
      };
  
      var filterContainsNot = function(curTag, x) {
        return function(x) {
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

  onCowClick (e) {
    console.log('click');
    this.setState({showAbout: !this.state.showAbout});
  }

	render() {
    var main = this.state.showAbout ? <HowCow /> : (<NewsList newsItems={this.state.filteredNewsItems} filterText={this.state.filterText.toLowerCase()} filterTags={this.state.filterTags}/>);
    return (
      <div id="MainContent">
        <div id="headerInfo">
          <NewsInfo itemcount={this.state.filteredNewsItems.length}
                    minutes={this.state.minutes}
                    others={this.state.numberOfReaders}
                    sources={this.state.sourceList} />
          <NewsCow onClickHandler={this.onCowClick.bind(this)}/>
          <NewsSearchBar onUserInput={ this.handleUserInput.bind(this) } filterText={this.state.filterText} onFilterSubmit={this.handleSubmit.bind(this)}/>      
          <NewsTagList filterTags={this.state.filterTags} onTagClick={this.handleTagClick.bind(this)}/>
        </div>
        <div id="mainList">
                    {main}
        </div>
      </div>
		);
	}
};

ReactDOM.render(<NewsApp />, document.getElementById('ReactMountPoint'));