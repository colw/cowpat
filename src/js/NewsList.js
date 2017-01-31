import React from "react";
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import NewsItem from "./NewsItem";
import NewsCow from "./NewsCow";

// const NewsItem = ({info}) => (
//   <div className="newsItem">
//     {info.title} <span className="subItem">{info.sitelink}</span>
//     <div style={{position: 'absolute', bottom: 0, right: 0}}>
//       <img src={`/dist/icons/${info.sitehost}.jpg`} />
//     </div>
//   </div>
// )

export default class NewsList extends React.Component {
  render () {

    if (this.props.loading) {
      return <div>Loading</div>
    }


    if (this.props.newsItems.length === 0) {
      return (
        <div id="emptyList">
        </div>
      );
    } else {
      var makeList = x => <li key={x.guid} className="newsItemWrapper"><NewsItem info={x}/></li>;

      return (
          <ReactCSSTransitionGroup component="ul" className="newsWrapper"
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}            
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            { this.props.newsItems.map(makeList) }
          </ReactCSSTransitionGroup>
  		);
    }
	}
};