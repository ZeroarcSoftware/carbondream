/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation square shape
 */

'use strict';

// External
import React from 'react';
import ClassNames from 'classnames';


const Square = (props) => {
  const divStyle = {
    height: props.height,
    width: props.width,
    zIndex: props.priority,
  };

  const classes = ClassNames({
    'cd-square': true,
    'deemphasize': props.deemphasize,
  });

  return (
    <div>
      <div style={divStyle} className={classes}></div>
    </div>
  );
};

Square.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  deemphasize: React.PropTypes.bool.isRequired,
};

export default Square;
