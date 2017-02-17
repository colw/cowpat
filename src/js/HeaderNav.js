import React from 'react';
import { Link } from 'react-router';

import { capitaliseEachWord } from './tools';

require('../scss/HeaderNav.scss');

class Header extends React.Component {
  state = {open: false}

  toggle = () => this.setState({open: !this.state.open})
  closeMenu = () => this.setState({open: false});

  render() {
    let makeList = (x,y) => (
      <li key={y}>
        <Link to={`/items/${x}`} activeClassName="active" onClick={this.closeMenu} onlyActiveOnIndex={true}>
          {capitaliseEachWord(x)}
        </Link>
      </li>
    )

    return (
      <div className="header-container">
        <div className="header-bar">
          <span className="menu-icon left" onClick={this.toggle}>
            <i className={"fa " + (this.state.open ? "fa-close" : "fa-bars")} aria-hidden="true"></i>
          </span>
          <h1 className="header-title">{this.props.title}</h1>
        </div>
        <div className={"menu-container " + (this.state.open ? "open" : "")}>
          <ul>
            <li key={this.props.items.length}>
              <Link to={`/`} activeClassName="active" onClick={this.closeMenu}  onlyActiveOnIndex={true}>
                Home
              </Link>
            </li>
            {
              this.props.items.map(makeList)
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Header;