import React from 'react';

export default class NewsTagList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick (e) {
    this.props.onTagClick(e.currentTarget.getAttribute('value'));
  }

  render () {
    var makeList = (x) => {
      var className="tagItem tagInclude actionRemoveTag";
      var text = x;
      if (x[0] === '-') {
        text = x.slice(1);
        className="tagItem tagExclude actionRemoveTag";
      }
      return (
        <li key={x} className={className}>
          <button type="button" value={x} onClick={this.handleClick.bind(this)}>{text}</button>
        </li>
      );
    };
    return (
      <ul id="tagList">{ this.props.filterTags.map(makeList) }</ul>
    );
  }
}
