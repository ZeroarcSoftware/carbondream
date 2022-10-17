// carbondream - Copyright 2021 Zeroarc Software, LLC
// Annotation circle shape
'use strict';

import ClassNames from 'classnames';
import React from 'react';

type Props = {
  width: number,
  height: number,
  priority: number,
  deemphasize: boolean,
};

export const Circle = (props: Props) => {
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

export default Circle;