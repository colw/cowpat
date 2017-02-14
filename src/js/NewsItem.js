import React from "react";
import moment from 'moment';

const LinkExt = (props) => (
  <a {...props} target="_blank" rel="noopener"/>
)

export default class NewsItem extends React.Component {

  state = {formattedTimeSince: moment(this.props.info.fetchDate).fromNow()};

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
				<LinkExt href={this.props.info.link}>
					<div className="headTitle">
            {this.props.info.title}
					</div>
        </LinkExt>
        <div className="subTitle"><LinkExt href={this.props.info.sitelink}>{hosturl}</LinkExt></div>
			</div>
		);
	}
};