import React from "react";

import { LinkExt } from './components';
import { getBaseURL } from './tools';

export const NewsItem = ({ info }) => (
  <div className="newsItem">
    <LinkExt href={info.link}>
      <div className="headTitle">
        {info.title}
      </div>
    </LinkExt>
    <div className="subTitle"><LinkExt href={info.sitelink}>{getBaseURL(info.metalink)}</LinkExt></div>
  </div>
)
