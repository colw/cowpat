import React from "react";

export default class NewsDuration extends React.Component {
render () {
    var duration = this.props.duration;
    var text = 'in ' + duration + (duration == 1 ? ' Minute' : ' Minutes');
    return (
      <span>{text}</span>
    );
  }
};