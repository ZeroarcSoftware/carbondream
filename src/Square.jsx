// @flow
// carbondream - Copyright 2017 Zeroarc Software, LLC
// Annotation square shape
'use strict';

import ClassNames from 'classnames';

type Props = {
  width: number,
  height: number,
  priority: number,
  deemphasize: bool,
};

export const Square = (props: Props) => {
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

export default Square;