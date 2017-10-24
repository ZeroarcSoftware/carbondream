// @flow
// carbondream - Copyright 2017 Zeroarc Software, LLC
// Annotation marker shape
'use strict';

import ClassNames from 'classnames';

type Props = {
  deemphasize: bool,
  priority: number,
};

export const Marker = (props: Props) => {
  const divStyle = {
    zIndex: props.priority,
  };

  const classes = ClassNames({
    'cd-marker': true,
    'deemphasize': props.deemphasize,
  });

  return (
    <div style={divStyle} className={classes}>
      <i className='fa fa-map-marker'></i>
    </div>
  );
};

export default Marker;