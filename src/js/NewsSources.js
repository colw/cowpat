import React from "react";

export default class NewsSources extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showSources: false};
  }

  handleClick () {
    this.setState({ showSources: !this.state.showSources });
  }

  render () {
    var that = this;
    var makeList = x => <li key={x} className="sourceItem">{x}</li>;
    var elt = null;
    if (this.state.showSources) {
      elt = (<ul>{ this.props.sourceList.map(makeList) }</ul>);
    }
    return (
      <span id="sourceList" onClick={this.handleClick.bind(this)}>
        {'from ' + this.props.sourceList.length + ' Sources' }
        {elt}
      </span>
    );
  }
}

