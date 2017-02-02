import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

require('../scss/menu.scss');

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({open: !this.state.open}, 
      () => {false && console.debug(this.state.open)});
  }
  render() {

    var makeList = (x) => (
      <li key={x} className="menu-item">
        <Link to={`/items/${x}`} onClick={() => this.setState({open: false})} activeClassName="active">{x.toLowerCase()}</Link>
      </li>
    );    

    var menuContainer = classNames({
      'burger-menu': true,
      'container': true,
      'open': this.state.open,
    });

    // var burgerBarsTop = classNames({
    //   'burger-bars': true,
    //   'top': true,
    // });
    // var burgerBarsMiddle = classNames({
    //   'burger-bars': true,
    //   'middle': true,
    // });
    // var burgerBarsBottom = classNames({
    //   'burger-bars': true,
    //   'bottom': true,
    // });        
            // <span style={{width: '100%', height: '100%'}}>
            //   <span className={burgerBarsTop}></span>
            //   <span className={burgerBarsMiddle}></span>
              // <span className={burgerBarsBottom}></span>
            // </span>

    return (
      <div className={menuContainer}>
        <div className="burger-button-container">
          <span className="burger-button" onClick={this.toggle}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </span>
          </div>          
        <div className="menu-children-container">
          <ul>
            {this.props.items.map(makeList)}
          </ul>
        </div>
      </div>
    )
  }
}


// <div class="bm-burger-button" data-radium="true" style="z-index: 1;"><span data-radium="true"><span class="bm-burger-bars" data-radium="true" style="position: absolute; height: 20%; left: 0px; right: 0px; top: 0%; opacity: 1;"></span><span class="bm-burger-bars" data-radium="true" style="position: absolute; height: 20%; left: 0px; right: 0px; top: 40%; opacity: 1;"></span><span class="bm-burger-bars" data-radium="true" style="position: absolute; height: 20%; left: 0px; right: 0px; top: 80%; opacity: 1;"></span></span><button data-radium="true" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; margin: 0px; padding: 0px; border: none; opacity: 0; font-size: 8px;">Open Menu</button></div>