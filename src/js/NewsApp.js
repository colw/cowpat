import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import NewsSearchBar from './NewsSearchBar';
import NewsWordList from './NewsWordList';
import NewsList from "./NewsList";
import NewsCow from "./NewsCow";

require('../scss/normalize.css');
// require('../scss/skeleton.css');
import 'purecss/build/pure-min.css';
require('../scss/style.scss');
require('../scss/fa/scss/font-awesome.scss');

function getTagFromPath() {
  const path =  window.location.pathname.split('/');
  console.log(path, window.location.href, window.location.pathname);
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
    console.debug(this.props, nextProps)
    if (nextProps.params.tag !== this.props.params.tag) {
      this.fetchItems(nextProps.params.tag);
    }
  }

  componentDidMount () {
    const t = getTagFromPath();
    this.fetchItems(t);
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

  handleTagClick (tag) {
    this.props.router.push(`/items/${tag}`);
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

  // isInText(text, filterText) {
  //   return text.indexOf(filterText) !== -1;
  // }

  // isInItem(item, filterText) {
  //   return 
  // }

  // filterList(list) {
  //   return list.filter(isInItem);
  // }


  render() {
    let loadMore = null;
    if (this.props.store.items.length) {
      loadMore = <div className="load-more-wrapper" onClick={this.props.store.fetchMore.bind(this.props.store)}><span className="load-more-button"><i className="fa fa-plus"></i></span></div>;
    }

    return (
      <div id="MainContent">
        <div id="headerInfo">
          <NewsWordList wordList={this.props.store.tags} />
        </div>
        <div id="mainList">
          <NewsList loading={this.state.loading} newsItems={this.props.store.items} filterText={this.state.filterText.toLowerCase()} filterTags={this.state.filterTags}/>
          {loadMore}
        </div>
      </div>
		);
	}
};
