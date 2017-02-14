import React from "react";
import moment from 'moment';

import { LinkExt } from './components';

export default class NewsItem extends React.Component {

  getBaseURL (url) {
    if (url.slice(0,4) != 'http') {
      url = 'http://' + url;
    }
    var a = document.createElement('a');
    a.href = url;
    return a.hostname.replace(/^www./, '');
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