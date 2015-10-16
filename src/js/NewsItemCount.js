import React from "react";

export default class NewsItemCount extends React.Component {
	render () {
    var itemCount = this.props.itemcount;
    var updateText = '';
    switch (itemCount) {
      case 0: updateText = 'No News'; break;
      case 1: updateText = '1 Update'; break;
      default: updateText = itemCount + ' Updates'; break;
    }
		return (
      <span id="itemCount">{updateText}</span>
		);
	}
};
