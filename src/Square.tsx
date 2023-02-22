// carbondream - Copyright 2021 Zeroarc Software, LLC
// Annotation square shape
'use strict';

import ClassNames from 'classnames';
import React from 'react';

type Props = {
  width: number;
  height: number;
  priority: number;
  deemphasize: boolean;
};

export const Square = (props: Props) => {
  const divStyle = {
    height: props.height,
    width: props.width,
    zIndex: props.priority,
  };

  const classes = ClassNames({
    'cd-square': true,
    deemphasize: props.deemphasize,
  });

  // Not possible to have a 0 width or height unless the object is off the page entirely.
  if (props.height <= 0 || props.width <= 0) return null;

  return (
    <div>
      <div style={divStyle} className={classes}></div>
    </div>
  );
};

export default Square;
