import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

require('../scss/header.scss');

function capitalise(t) {
  return t[0].toUpperCase() + t.slice(1);
}

let MenuItem = ({tag}) => (
  <li>
    <Link to={`/items/${tag}`} onClick={() => this.setState({open: false})}>
      {capitalise(tag)}
    </Link>
  </li>
)

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({open: !this.state.open}, 
      () => {console.debug(this.state.open)});
  }
  render() {


    let makeList = (x,y) => {
      console.debug(x,y);
      return <MenuItem key={y} tag={x} />
    }

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
            {
              this.props.items.map(makeList)
            }
          </ul>
        </div>
      </div>
    )
  }
}


// <div class="bm-burger-button" data-radium="true" style="z-index: 1;"><span data-radium="true"><span class="bm-burger-bars" data-radium="true" style="position: absolute; height: 20%; left: 0px; right: 0px; top: 0%; opacity: 1;"></span><span class="bm-burger-bars" data-radium="true" style="position: absolute; height: 20%; left: 0px; right: 0px; top: 40%; opacity: 1;"></span><span class="bm-burger-bars" data-radium="true" style="position: absolute; height: 20%; left: 0px; right: 0px; top: 80%; opacity: 1;"></span></span><button data-radium="true" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; padding: 0px; border: none; opacity: 0; font-size: 8px;">Open Menu</button></div>