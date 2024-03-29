// carbondream - Copyright 2021 Zeroarc Software, LLC
// Controls to toggle annotation modes
'use strict';

import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Mode } from './types';

type Props = {
  mode: string;
  verticalOffset: number;
  switchMode: (mode: Mode) => void;
};

// This is necessary to prevent mouseup/down from triggering actions on parents
const blockEvent = (e: React.MouseEvent<Element, MouseEvent>) => {
  e.stopPropagation();
};

export const ModeToggle = ({ mode, verticalOffset, switchMode }: Props) => {
  const handleClick = (mode: Mode) => {
    return (e: React.MouseEvent<Element, MouseEvent>) => {
      e.stopPropagation();
      switchMode(mode);
    };
  };

  return (
    <div
      className='cd-mode-toggle'
      onMouseUp={blockEvent}
      onMouseDown={blockEvent}
      onClick={blockEvent}
      style={{ top: `${verticalOffset}px` }}
    >
      <button
        className={mode === 'marker' ? 'selected' : ''}
        onClick={handleClick('marker')}
        title='Switch to marker'
      >
        <FontAwesomeIcon icon={['far', 'map-marker']} />
      </button>
      <button
        className={mode === 'square' ? 'selected' : ''}
        onClick={handleClick('square')}
        title='Switch to square'
      >
        <FontAwesomeIcon icon={['far', 'square']} />
      </button>
      <button
        className={mode === 'circle' ? 'selected' : ''}
        onClick={handleClick('circle')}
        title='Switch to circle'
      >
        <FontAwesomeIcon icon={['far', 'circle']} />
      </button>
      <button
        className={mode === 'highlight' ? 'selected' : ''}
        onClick={handleClick('highlight')}
        title='Switch to highlight'
      >
        <FontAwesomeIcon icon={['far', 'font']} />
      </button>
    </div>
  );
};

export default ModeToggle;
