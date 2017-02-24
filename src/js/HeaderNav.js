import React from 'react';
import { Link } from 'react-router-dom';
import store from './store';
import { capitaliseEachWord } from './tools';

require('../scss/HeaderNav.scss');

class Header extends React.Component {
  state = {open: false, tags: []}

  toggle = () => this.setState({open: !this.state.open})

  componentDidMount() {
    store.setListener(this.setTags);
    this.fetchTags();
  }
  
  fetchTags = () => {
    store.fetchItems();
  }

  setTags = () => {
    const tags = store.getState();
    this.setState({tags: tags.tags});
  }

  render() {
    let makeList = (x,y) => (
      <li key={y}>
        <Link to={`/items/${x}`} onClick={() => this.setState({open: false})}>
          {capitaliseEachWord(x)}
        </Link>
      </li>
    )

    return (
      <div id="headerInfo" className="header-container">
        <div className="header-bar">
          <span className="menu-icon left" onClick={this.toggle}>
            <i className={"fa " + (this.state.open ? "fa-close" : "fa-bars")} aria-hidden="true"></i>
          </span>
          <h1 className="header-title">{this.props.title}</h1>
        </div>
        <div className={"menu-container " + (this.state.open ? "open" : "")}>
          <ul>
            <li key={this.state.tags.length}>
              <Link to={`/`} onClick={() => this.setState({open: false})}>
                Home
              </Link>
            </li>
            { this.state.tags.map(makeList) }
          </ul>
        </div>
      </div>
    )
  }
}

export default Header;