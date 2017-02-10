import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';


require('./style.css');

function capitalise(t) {
  return t[0].toUpperCase() + t.slice(1);
}

function capitaliseEachWord(ws) {
  console.debug(ws);
  return ws.split(' ').map(capitalise).join(' ');
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.toggle = this.toggle.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  toggle() {
    this.setState({open: !this.state.open}, 
      () => {console.debug(this.state.open)});
  }
  closeMenu(e) {
    this.setState({open: false}, 
      () => {console.debug(this.state.open)});
  }
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