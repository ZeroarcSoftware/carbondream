// carbondream - Copyright 2021 Zeroarc Software, LLC
// Annotation highlight shape
'use strict';

import ClassNames from 'classnames';
import React from 'react';

type Props = {
  width: number,
  deemphasize: boolean,
  priority: number,
};

export const Highlight = (props: Props) => {
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
export default Highlight;