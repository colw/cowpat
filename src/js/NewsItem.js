import React from "react";
import moment from 'moment';

export default class NewsItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {formattedTimeSince: moment(this.props.info.fetchDate).fromNow()};
  }

  componentDidMount () {
    this.setInterval(this.updateTime.bind(this), 30000);
  }

  updateTime () {
    this.setState({formattedTimeSince: moment(this.props.info.fetchDate).fromNow()});
  }

  getBaseURL (url) {
    if (url.slice(0,4) != 'http') {
      url = 'http://' + url;
    }
    var a = document.createElement('a');
    a.href = url;
    return a.hostname.replace(/^www./, '');
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

	render () {
    var hosturl = this.getBaseURL(this.props.info.metalink);
		return (
			<div className="newsItem">
				<a href={this.props.info.link} target="_blank">
					<div className="headTitle">
            {this.props.info.title}
					</div>
        </a>
        <div className="subTitle">{hosturl} <span className="subTime"> {this.state.formattedTimeSince}</span></div>
			</div>
		);
	}
};