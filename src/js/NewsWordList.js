import React from 'react';
import { Link } from 'react-router';

const NavLink = (props) => (
  <Link {...props} activeClassName="active" />
)

export default class NewsWordList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {

    if (!this.props.wordList.length) {
      return <div></div>;
    }

    var makeList = (x) => (
      <li key={x} className="pure-menu-item">
        <Link className="pure-menu-link" to={`/items/${x}`}>{x}</Link>
      </li>
    );

    return (
      <div className="pure-menu pure-menu-horizontal">
        <ul className="pure-menu-list">
          <li key={'/'} className="pure-menu-item">
            <NavLink className="pure-menu-link" to="/"><i className="fa fa-home" aria-hidden="true"></i></NavLink>
          </li>
          { this.props.wordList.map(makeList) }
        </ul>
      </div>
    );
  }
}
