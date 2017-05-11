/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation highlight shape
 */

'use strict';

import PropTypes from 'prop-types';

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
  width: PropTypes.number.isRequired,
  deemphasize: PropTypes.bool.isRequired,
};

export default Highlight;
