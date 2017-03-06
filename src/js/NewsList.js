import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import caldiff from 'date-fns/difference_in_calendar_days';
import datefmt from 'date-fns/format';
import { NewsItem } from "./NewsItem";

export default class NewsList extends React.Component {
  makeItem = (x) => (
    <li key={x.itemID} className="newsItemWrapper">
      <NewsItem info={x}/>
    </li>
  );

  makeTimeStamp = (x) => (
    <li key={x.itemID+x.date} className="newsItemSeparator">
      <span>{datefmt(x.date, 'MMM Do')}</span>
    </li>
  );

  makeComponents = (item) => {
    if (item.type) {
      if (item.type === 'timestamp') {
        return this.makeTimeStamp(item.data)
      } else {
        return this.makeItem(item.data);
      }
    }
    return this.makeItem(item);      
  }

  insertTimeStamps = (list) => {
    const l = list.slice();

    const fn = (acc, curVal, curIndex, items) => {
      const lastDate = acc.length ? acc[acc.length-1].data.date : null;
      const curDate = curVal.date;

      if (curIndex === 0 || caldiff(lastDate, curDate) > 0) {
        return [...acc, {type: 'timestamp', data: curVal}, {type: 'newsitem', data: curVal}]
      }

      return [...acc, {type: 'newsitem', data: curVal}];
    }

    return l.reduce(fn, []);
  }

  render () {
    if (this.props.loading) {
      return <div>Loading</div>
    }

    if (this.props.newsItems.length === 0) {
      return (
        <div id="emptyList">No news is good news.</div>
      );
    } else {

      return (
          <div id="mainList">
            <ReactCSSTransitionGroup component="ul" className="newsWrapper"
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={500}            
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {
                this.insertTimeStamps(this.props.newsItems).map(this.makeComponents)
              }
            </ReactCSSTransitionGroup>
          </div>
  		);
    }
	}
};