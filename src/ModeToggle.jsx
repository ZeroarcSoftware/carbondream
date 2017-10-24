// @flow
// carbondream - Copyright 2017 Zeroarc Software, LLC
// Controls to toggle annotation modes
'use strict';

import type { Mode } from './flowTypes';

type Props = {
  mode: string,
  switchMode: (mode: Mode) => void
};

  // This is neccessary to prevent mouseup/down from triggering actions on parents
const blockEvent = (e: SyntheticInputEvent) => {
  e.stopPropagation();
};

export const ModeToggle = ({
  mode,
  switchMode,
}: Props) => {

  const handleClick = (mode: Mode) => {
    return (e) => {
      e.stopPropagation();
      switchMode(mode);
    };
  };

  return (
    <div className='cd-mode-toggle' onMouseUp={blockEvent} onMouseDown={blockEvent} onClick={blockEvent}>
      <button className={mode === 'marker' ? 'selected' : ''}
        onClick={handleClick('marker')}
        title='Switch to marker'>
        <i className='fa fa-map-marker'></i>
      </button>
      <button className={mode === 'square' ? 'selected' : ''}
        onClick={handleClick('square')}
        title='Switch to square'>
        <i className='fa fa-square-o'></i>
      </button>
      <button className={mode === 'circle' ? 'selected' : ''}
        onClick={handleClick('circle')}
        title='Switch to circle'>
        <i className='fa fa-circle-o'></i>
      </button>
      <button className={mode === 'highlight' ? 'selected' : ''}
        onClick={handleClick('highlight')}
        title='Switch to highlight'>
        <i className='fa fa-font'></i>
      </button>
    </div>
  );
};

export default ModeToggle;