import React from 'react';
import ReactDOM from 'react-dom';

export default class NewsSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filterText: ''};
  }

  handleChange () {
    this.props.onUserInput(
      this.refs.filterTextInput.value
    );
  }

  handleSubmit (e) {
    e.preventDefault();
    var filterText = this.refs.filterTextInput.value;
    this.props.onFilterSubmit(filterText);
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.filterTextInput).focus();
  }

  render () {
    return (
      <div id="filterBox">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input id="filterTextInput"
            ref="filterTextInput"
            value={this.props.filterText}
            type="search"
            onChange={this.handleChange.bind(this)}
            placeholder="Filter By..."/>
        </form>
      </div>
    );
  }
}
