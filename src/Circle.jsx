/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation circle shape
 */

'use strict';

import PropTypes from 'prop-types';

// External
import React from 'react';
import ClassNames from 'classnames';


const Circle = (props) => {
  const divStyle = {
    height: props.height,
    width: props.width,
    zIndex: props.priority,
  };

  const classes = ClassNames({
    'cd-circle': true,
    'deemphasize': props.deemphasize,
  });

  return (
    <div>
      <div style={divStyle} className={classes}></div>
    </div>
  );
};

Circle.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  deemphasize: PropTypes.bool.isRequired,
};

export default Circle;
