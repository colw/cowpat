import React from 'react';
import {Link} from 'react-router';

export default class NewsWordList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick (e) {
    this.props.onTagClick(e.currentTarget.getAttribute('value'));
  }

  handleRemoveClick (e) {
    this.props.onTagClick('-' + e.currentTarget.getAttribute('value'));
  }

  render () {

    if (!this.props.wordList.length) {
      return <div></div>;
    }

    var makeList = (x) => (
      <li key={x} className="tagItem tagPopular actionAddTag">
        <Link to={`/items/${x}`} activeClassName="active">{x.toLowerCase()}</Link>
      </li>
    );
    console.debug(this.props.wordList);
    return (
      <div>
        <ul id="tagList">
          <li key={'/'} className="tagItem tagPopular actionAddTag">
            <Link to={'/'} activeClassName="active"><i className="fa fa-home"></i></Link>
          </li>
          { this.props.wordList.map(makeList) }
        </ul>
      </div>
    );
  }
}
