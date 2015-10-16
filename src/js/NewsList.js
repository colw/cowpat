import React from "react";
import moment from 'moment';

import NewsItem from "./NewsItem";

export default class NewsList extends React.Component {
  render () {
    if (this.props.newsItems.length === 0) {
      return (
        <div id="emptyList">
          <p>Please wait for some news to be published. Shan't be long.</p>
          <p id="nogoodnews">No news is good moos, right?</p>
        </div>
      );
    } else {
      var makeList = function(x) {
        return (<li key={x.guid}><NewsItem info={x} /></li>);
      };
      return (
  			<ul>
          { this.props.newsItems.map(makeList) }
  			</ul>
  		);
    }
	}
};