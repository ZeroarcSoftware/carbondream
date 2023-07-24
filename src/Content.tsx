// carbondream - Copyright 2021 Zeroarc Software, LLC
// Pop-up annotation Content
'use strict';

import React, { useState } from 'react';
import ClassNames from 'classnames';
import TimeAgo from 'react-timeago';

import type { Offset } from './types';

type Props = {
  allowDelete: boolean;
  allowEdit: boolean;
  author: string;
  content: string;
  deleteAnnotation: (id: number) => void;
  editAnnotation: (id: number) => void;
  hideContent: boolean | undefined;
  id: number;
  invert: boolean;
  offset: Offset;
  top: number;
  left: number;
  pending: boolean;
  pullHorizontal: boolean;
  pushHorizontal: boolean;
  shouldDisplayViewer: boolean;
  timeStamp?: Date;
  viewOnlyMode: boolean;
};

export const Content = (props: Props) => {
  const [shouldDisplayControls, setShouldDisplayControls] = useState(false);

  const handleEditClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if (props.viewOnlyMode) return;

    props.editAnnotation(props.id);
  };

  const handleDeleteClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if (props.viewOnlyMode) return;

    props.deleteAnnotation(props.id);
  };

  // These allow event propogation because parent needs mouse events
  const handleMouseOver = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (props.viewOnlyMode) return;

    setShouldDisplayControls(true);
  };

  const handleMouseOut = (e: React.MouseEvent<Element, MouseEvent>) => {
    setShouldDisplayControls(false);
  };

  const viewerClasses = ClassNames({
    'cd-annotation-viewer': true,
    hidden: props.pending || !props.shouldDisplayViewer || props.hideContent, //Hide if we are NOT pending and we SHOULD NOT display
  });

  const contentClasses = ClassNames({
    'cd-annotation-content': true,
  });

  const controlClasses = ClassNames({
    'cd-annotation-content-controls': true,
    'fade-in': shouldDisplayControls,
  });

  const shadowClasses = ClassNames({
    'cd-shadow-bubble': true,
    invert: props.invert,
  });

  // Apply offsets for shadow bubble. Trial and error to figure
  // out the maximums
  let shadowStyle: { left?: number } = {};
  if (props.pushHorizontal || props.pullHorizontal) {
    shadowStyle.left = props.offset.shadow || -props.offset.horizontal - 4;

    if (shadowStyle.left < 6) shadowStyle.left = 6;
    else if (shadowStyle.left > 234) shadowStyle.left = 234;
  }

  console.log('hans', props)

  return (
    <div
      style={{
        left: props.left + props.offset.horizontal,
        top: props.top + props.offset.vertical,
        position: 'fixed',
      }}
      className={viewerClasses}
    >
      <div style={shadowStyle} className={shadowClasses}></div>
      <div
        className={contentClasses}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className={controlClasses}>
          <button
            className='delete'
            onClick={handleDeleteClick}
            hidden={!props.allowDelete}
          >
            <i className='fa fa-fw fa-times'></i> Delete
          </button>
          <button
            className='edit'
            onClick={handleEditClick}
            hidden={!props.allowEdit}
          >
            <i className='fa fa-fw fa-pencil'></i> Edit
          </button>
        </div>
        <div className='cd-annotation-content-text'>{props.content}</div>
        <div className='cd-annotation-content-info'>
          Comment #{props.id} by {props.author}{' '}
          {props.timeStamp ? <TimeAgo date={props.timeStamp} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Content;
