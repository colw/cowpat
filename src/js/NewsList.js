import React from "react";
import moment from 'moment';

import NewsItem from "./NewsItem";
import NewsCow from "./NewsCow";


export default class NewsList extends React.Component {
  render () {

    if (this.props.loading) {
      return <div>Loading</div>
    }


    if (this.props.newsItems.length === 0) {
      return (
        <div id="emptyList">
          <p>A black and white cow</p>
        </div>
      );
    } else {
      var makeList = x => <li key={x.guid}><NewsItem info={x}/></li>;
      return (
  			<ul>
          { this.props.newsItems.map(makeList) }
  			</ul>
  		);
    }
	}
};