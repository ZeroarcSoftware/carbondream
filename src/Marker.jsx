// @flow
// carbondream - Copyright 2019 Zeroarc Software, LLC
// Annotation marker shape
'use strict';

import ClassNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

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
      <FontAwesomeIcon icon={['far', 'map-marker']} /> 
    </div>
  );
};

export default Marker;