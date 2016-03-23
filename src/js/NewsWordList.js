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
    var makeList = (x) => (
      <li key={x.word} className="tagItem tagPopular actionAddTag">
        <button type="button" value={x.word} onClick={this.handleClick.bind(this)}>{x.word.toLowerCase()}</button>
        <button type="button" value={x.word} onClick={this.handleRemoveClick.bind(this)}></button>
      </li>
    );
    return (
      <div>
        <div>Trending</div>
        <ul id="tagList">{ this.props.wordList.map(makeList) }</ul>
      </div>
    );
  }
}
