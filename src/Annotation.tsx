// carbondream - Copyright 2021 Zeroarc Software, LLC
// Annotation component
'use strict';

import React, { ReactElement, useEffect, useRef, useState } from 'react';

import Marker from './Marker';
import Square from './Square';
import Circle from './Circle';
import Highlight from './Highlight';
import Content from './Content';
import Input from './Input';

import type { Offset } from './types';

// Globals
const BUBBLEDIM = { width: 260, height: 120 };

type Props = {
  allowEdit: boolean;
  allowDelete: boolean;
  author: string;
  content: string;
  containerOffset: Offset;
  deemphasize: boolean;
  horizontalOffset: number;
  hideContent: boolean;
  id?: number;
  pending: boolean;
  priority: number;
  type: string;
  viewOnlyMode: boolean;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  scale: number;

  // Optional
  cancelAnnotation: () => void;
  deleteAnnotation: (id: number) => void;
  displayAnnotationViewer?: (id: number) => void;
  editAnnotation: (id: number) => void;
  hideAnnotationViewer?: (id: number) => void;
  saveAnnotation: (value: string) => void;
  timeStamp?: Date;
} & typeof defaultProps;

const defaultProps = {
  drawing: false,
  shouldDisplayViewer: false,
};

export const Annotation = (props: Props): ReactElement => {
  props = { ...defaultProps, ...props };
  const annotationWrapper = useRef<HTMLDivElement>(null);
  const leftPageOffset = props.horizontalOffset || 0;

  // This isn't actually used anywhere, but causes react to re-render the
  // Input component after the annotationWrapper has been rendered and has coordinates
  // This addresses the Input not showing issue #2042
  const [annotationWrapperLoc, setAnnotationWrapperLoc] = useState({
    top: 0,
    left: 0,
  });

  // This effect is the second part of the work around described above.
  // This addresses the Input not showing issue #2042
  useEffect(() => {
    const rect = annotationWrapper.current?.getBoundingClientRect();
    // Horizontal offset is only used here to compensate for an edge case
    // when an iframe is causing the page to shift horizontally which breaks
    // fixed position styling.

    if (rect) {
      setAnnotationWrapperLoc({
        top: rect.top,
        left: rect.left - leftPageOffset,
      });
    }
  }, []);

  const handleMouseOver = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if (props.pending || !props.id) return;
    if (!props.displayAnnotationViewer) return;
    props.displayAnnotationViewer(props.id);
  };

  const handleMouseOut = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if (props.pending || !props.id) return;
    if (!props.hideAnnotationViewer) return;
    props.hideAnnotationViewer(props.id);
  };

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    // Allow markers to be placed inside shapes, but not on other markers
    if (props.type === 'marker') e.stopPropagation();
  };

  // Destructuring is on one line b/c vim indenting gets confused
  const {
    x1,
    y1,
    x2,
    y2,
    displayAnnotationViewer,
    hideAnnotationViewer,
    ...other
  } = props;

  let width = Math.abs(x1 - x2);
  let height = Math.abs(y1 - y2);

  // Figure out what direction the mouse is dragging. 1 === left to right, up to down
  const xDir = x2 - x1 >= 0 ? 1 : -1;
  const yDir = y2 - y1 >= 0 ? 1 : -1;

  const divStyle = {
    left: xDir === 1 ? x1 : x2,
    top: yDir === 1 ? y1 : y2,
  };

  // Default offsets based on height/width of bubble
  const offset: Offset = {
    vertical: -BUBBLEDIM.height - 10,
    horizontal: width / 2 - BUBBLEDIM.width / 2,
    shadow: null,
  };

  let indicator: JSX.Element | null = null;

  switch (props.type) {
    case 'marker':
      indicator = (
        <Marker deemphasize={props.deemphasize} priority={props.priority} />
      );
      offset.vertical -= 25;
      height = 0;
      offset.horizontal = -BUBBLEDIM.width / 2;
      break;
    case 'square':
      indicator = (
        <Square
          deemphasize={props.deemphasize}
          width={width}
          height={height}
          priority={props.priority}
        />
      );
      break;
    case 'circle':
      // For circles, we need to use the biggest mouse value as diameter
      width = height = Math.max(width, height);
      indicator = (
        <Circle
          deemphasize={props.deemphasize}
          width={width}
          height={height}
          priority={props.priority}
        />
      );
      break;
    case 'highlight':
      divStyle.top = y1; // Force back to y1, highlights must stay on same vertical height
      height = 15 * props.scale; // Force height of highlight to allow correct bubble placement
      indicator = (
        <Highlight
          deemphasize={props.deemphasize}
          width={width}
          height={height}
          priority={props.priority}
        />
      );
      break;
  }

  // If we are going to push above the viewport, invert the bubble and modify the offset to draw below
  const invert =
    y1 + offset.vertical - 10 + props.containerOffset.vertical <= 0
      ? true
      : false;
  if (invert) offset.vertical = height + 36;

  // Check to see if we are going to draw past the left or right side of the viewport.
  if (!document || !document.documentElement) return <div></div>;
  const viewPortWidth =
    document.documentElement.clientWidth - props.containerOffset.horizontal;

  const pushHorizontal =
    x1 + (width / 2 - BUBBLEDIM.width / 2) + props.containerOffset.horizontal <=
    0
      ? true
      : false;
  const pullHorizontal =
    x1 + (width / 2 + BUBBLEDIM.width / 2) >= viewPortWidth ? true : false;

  // If we need to push or pull the bubble, recalculate the offsets based on bubble size and
  // marker position. This was fun to figure out. The 5 is just there for additional padding.
  if (pushHorizontal) {
    const additionalOffset = offset.horizontal + x1 - 5;
    offset.horizontal = offset.horizontal - additionalOffset;

    if (props.type !== 'marker') offset.shadow = x1 + width / 2 - 14;
    else offset.shadow = x1 - 14;
  } else if (pullHorizontal) {
    const additionalOffset =
      viewPortWidth - (BUBBLEDIM.width + 5) - offset.horizontal - x1;
    offset.horizontal = offset.horizontal + additionalOffset;

    if (props.type !== 'marker')
      offset.shadow = -offset.horizontal + width / 2 - 10;
    else offset.shadow = -offset.horizontal - 10;
  }

  const contentComponent =
    !props.drawing && !props.pending && other.id ? (
      <Content
        id={other.id}
        invert={invert}
        pushHorizontal={pushHorizontal}
        pullHorizontal={pullHorizontal}
        offset={offset}
        // Recalculate the position each time the element is rendered, otherwise we end up with stale coordinates
        // when parent containers shift around
        top={annotationWrapper.current?.getBoundingClientRect().top || 0}
        left={
          (annotationWrapper.current?.getBoundingClientRect().left || 0) -
          leftPageOffset
        }
        {...other}
      />
    ) : (
      <></>
    );
  const inputComponent =
    !props.drawing && props.pending ? (
      <Input
        invert={invert}
        pushHorizontal={pushHorizontal}
        pullHorizontal={pullHorizontal}
        offset={offset}
        // Recalculate the position each time the element is rendered, otherwise we end up with stale coordinates
        // when parent containers shift around
        top={annotationWrapper.current?.getBoundingClientRect().top || 0}
        left={
          (annotationWrapper.current?.getBoundingClientRect().left || 0) -
          leftPageOffset
        }
        {...other}
      />
    ) : (
      <></>
    );

  //console.log(`drawing indicator at left: ${divStyle.left}, top: ${divStyle.top}`);
  return (
    <div
      id={`annotation-${props.id}`}
      style={divStyle}
      ref={annotationWrapper}
      className={'cd-annotation ' + props.type}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      {contentComponent}
      {inputComponent}
      {indicator}
    </div>
  );
};

Annotation.defaultProps = defaultProps;

export default Annotation;
