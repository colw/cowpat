import React from 'react';

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
        <button type="button" value={x} onClick={this.handleClick.bind(this)}>{x.toLowerCase()}</button>
        <button type="button" value={x} onClick={this.handleRemoveClick.bind(this)}></button>
      </li>
    );

    return (
      <div>
        <ul id="tagList">{ this.props.wordList.map(makeList) }</ul>
      </div>
    );
  }
}
