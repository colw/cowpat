import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { withRouter } from 'react-router'


require('../scss/header.scss');

function capitalise(t) {
  return t[0].toUpperCase() + t.slice(1);
}

let MenuItem = ({text, clickItem}) => (
  <li>
    <Link activeClassName="active" onClick={() => this.setState({open: false})}>
      {capitalise(text)}
    </Link>
  </li>
)

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
  componentDidMount() {
    console.debug(this.props.route);
  }

  render() {
    let makeList = (x,y) => (
      <li key={y}>
        <Link to={`/items/${x}`} activeClassName="active" onClick={this.closeMenu}>
          {capitalise(x)}
        </Link>
      </li>
    )

    return (
      <div className="header-container">
        <div className="header-bar">
          <span className="menu-icon left" onClick={this.toggle}>
            <i className={"fa " + (this.state.open ? "fa-close" : "fa-bars")} aria-hidden="true"></i>
          </span>
          <h1 className="header-title">{this.props.current ? `‘${this.props.current}’` : this.props.title}</h1>
        </div>
        <div className={"menu-container " + (this.state.open ? "open" : "")}>
          <ul>
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