import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import store from './store';
import NewsItem from "./NewsItem";

export default class NewsList extends React.Component {
  state = {open: false, items: []}

  componentDidMount() {
    store.setListener(this.setNewsItems);
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.tag !== this.props.match.params.tag) {
      this.fetchData();
    }
  }

  fetchData = () => {
    store.fetchItems(this.props.match.params.tag || '');
  }

  setNewsItems = () => {
    const state = store.getState();
    console.debug(state);
    this.setState({items: state.items});
  }

  render () {
    console.debug('render', this.state.items);
    if (this.props.loading) {
      return <div>Loading</div>
    }

    if (this.state.items.length === 0) {
      return (
        <div id="emptyList">No news is good news.</div>
      );
    } else {
      var makeList = (x) => (
        <li key={x.itemID} className="newsItemWrapper">
          <NewsItem info={x}/>
        </li>
      );

      return (
          <div id="mainList">
            <ReactCSSTransitionGroup component="ul" className="newsWrapper"
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={500}            
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              { this.state.items.map(makeList) }
            </ReactCSSTransitionGroup>
          </div>
  		);
    }
	}
};