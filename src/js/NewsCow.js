import React from 'react';

export default class NewsCow extends React.Component {
  constructor(props) {
    super(props);
    var cowords = [
        "Udderly brilliant"
      , "News that mooves you"
      , "Hoofin' along"      
    ];
    var cowImg = require('../images/Guernsey_cow.png');
    this.state = {cow: cowImg, cowords: cowords};
  }
  
  handleClick () {
    this.props.onClickHandler();
  }

  getRandomInteger (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

	render () {
    var randElt = this.getRandomInteger(0, this.state.cowords.length);
    var saying = this.state.cowords[randElt];
		return (
      <div id="cow" onClick={this.handleClick.bind(this)}>
        <img src={this.state.cow} alt="A black and white cow" title={saying} />
      </div>
		);
	}
};