import React from "react";

import NewsItemCount from './NewsItemCount';
import NewsDuration from './NewsDuration';
import NewsSources from './NewsSources';

export default class NewsInfo extends React.Component {
	render () {
    return (
      <div id="newheader">
        <NewsItemCount itemcount={this.props.itemcount}/> <NewsDuration duration={this.props.minutes} /> <NewsSources sourceList={this.props.sources} />  
      </div>
    );
  }
};