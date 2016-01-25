import React from "react";

export default (props) =>
	<span>{'in ' + props.duration + (props.duration == 1 ? ' Minute' : ' Minutes')}</span>
