/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation highlight shape
 */

'use strict';

// External
import React from 'react';
import ClassNames from 'classnames';


const Highlight = (props) => {
  const divStyle = {
    width: props.width,
    zIndex: props.priority,
  };

  const classes = ClassNames({
    'cd-highlight': true,
    'deemphasize': props.deemphasize,
  });

  return (
    <div>
      <div style={divStyle} className={classes}></div>
    </div>
  );
};

Highlight.propTypes = {
  width: React.PropTypes.number.isRequired,
  deemphasize: React.PropTypes.bool.isRequired,
};

export default Highlight;
