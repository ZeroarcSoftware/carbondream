// carbondream - Copyright 2021 Zeroarc Software, LLC
// Top level container component
'use strict';

import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

import Annotation from './Annotation';
import ModeToggle from './ModeToggle';

import type { 
  Annotation as AnnotationType,
  Mode, 
  Offset
} from './types';

type Props = {
  allowDelete: boolean,
  allowEdit: boolean,
  annotations: any,
  onDelete: (id: number) => void,
  onDeselect?: () => void,
  onSave: (type: AnnotationType) => void,
  onSelect?: (id: number) => void,
} & typeof defaultProps;

const defaultProps = {
  viewOnlyMode: false,
  selectedId: 0,
  scale: 1,
  hidden: false,
};

export const Container = (props: Props) => {
  props = {...defaultProps, ...props}
  
  //#region Hooks

  const [pendingAnnotation, setPendingAnnotation] = useState(null);
  const [visibleViewerId, setVisibleViewerId] = useState(props.selectedId || 0);
  const [mode, setMode] = useState('marker');
  const [containerOffset, setContainerOffset] = useState({vertical: 0, horizontal: 0, shadow: null});

  const viewerHideTimer = useRef(null);
  const cdContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const component = ReactDOM.findDOMNode(this);

    if (!component) return;
    component.addEventListener("scroll", updateOffset);
    updateOffset();

    return () => component.removeEventListener("scroll", updateOffset);
  }, []);

  useEffect(() => {
    setVisibleViewerId(props.selectedId);
  }, [props.selectedId]);
    
  //#endregion

  const getOffset = (element: Element): Offset => {
    const doc = element && element.ownerDocument;

    if (!doc || !element || typeof element.getBoundingClientRect !== 'function') {
      return { vertical: 0, horizontal: 0, shadow: null};
    }

    const box = element.getBoundingClientRect();

    return {
      vertical: box.top,
      horizontal: box.left,
      shadow: null,
    };
  };

  const updateOffset = () => {
    const offset = getOffset(cdContainer.current)
    setContainerOffset(offset);
  };

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    console.log(`click fired. scale: ${props.scale}, offset(top/left): ${containerOffset.vertical}/${containerOffset.horizontal}, clientX: ${e.clientX}, clientY: ${e.clientY}, screenX: ${e.screenX}, screenY: ${e.screenY}`  );
    e.stopPropagation();
    if (props.viewOnlyMode) return;

    updateOffset();

    if (pendingAnnotation || mode !== 'marker') return;

    const annotation = Immutable.Map({
      content: '',
      timeStamp: new Date(),
      type: mode,
      x1: Math.round((e.clientX - containerOffset.horizontal) / props.scale),
      y1: Math.round((e.clientY - containerOffset.vertical) / props.scale),
      x2: Math.round((e.clientX + 14 - containerOffset.horizontal) / props.scale), //14 & 24 are the size of the marker
      y2: Math.round((e.clientY + 24 - containerOffset.vertical) / props.scale),
    });

    //console.log(`annotation: scale: ${props.scale}, offset(top/left): ${containerOffset.vertical}/${containerOffset.horizontal}, x1: ${annotation.get('x1')}, y1: ${annotation.get('y1')}, x2: ${annotation.get('x2')}, y2: ${annotation.get('y2')}`);

    setPendingAnnotation(annotation);
  };

  const handleMouseDown = (e: React.MouseEvent<Element, MouseEvent>) => {
    //console.log(`mousedown fired. scale: ${props.scale}, clientX: ${e.clientX}, clientY: ${e.clientY}, screenX: ${e.screenX}, screenY: ${e.screenY}`  );
    e.stopPropagation();
    if (props.viewOnlyMode) return;

    updateOffset();

    if (pendingAnnotation || visibleViewerId || mode === 'marker') return;

    const annotation = Immutable.Map({
      content: '',
      timeStamp: new Date(),
      type: mode,
      drawing: true,
      x1: Math.round((e.clientX - containerOffset.horizontal) / props.scale),
      y1: Math.round((e.clientY - containerOffset.vertical) / props.scale),
      x2: Math.round((e.clientX - containerOffset.horizontal) / props.scale),
      y2: Math.round((e.clientY - containerOffset.vertical) / props.scale),
    });

    setPendingAnnotation(annotation);
  };

  const handleMouseMove = (e: React.MouseEvent<Element, MouseEvent>) => {
    //console.log(`mousemove fired. scale: ${props.scale}, clientX: ${e.clientX}, clientY: ${e.clientY}, screenX: ${e.screenX}, screenY: ${e.screenY}`  );
    e.stopPropagation();
    if (props.viewOnlyMode) return;

    updateOffset();

    if (visibleViewerId || mode === 'marker' || !pendingAnnotation) return;

    // If drawing is not true, then don't proceed
    let annotation = pendingAnnotation;
    if (annotation === null) return;
    if (!annotation.get('drawing')) return;

    annotation = annotation
      .set('x2', (e.clientX - containerOffset.horizontal) / props.scale)
      .set('y2', (e.clientY - containerOffset.vertical) / props.scale);

    setPendingAnnotation(annotation);
  };

  const handleMouseUp = (e: React.MouseEvent<Element, MouseEvent>) => {
    //console.log(`mouseup fired. scale: ${props.scale}, clientX: ${e.clientX}, clientY: ${e.clientY}, screenX: ${e.screenX}, screenY: ${e.screenY}`  );
    e.stopPropagation();
    if (props.viewOnlyMode) return;

    updateOffset();

    if (visibleViewerId || mode === 'marker' || !pendingAnnotation) return;

    // If drawing is false, we have already popped the input dialog
    let annotation = pendingAnnotation;
    if (annotation === null) return;
    if (!annotation.get('drawing')) return;

    annotation = annotation
      .set('drawing', false)
      .set('x2', Math.round((e.clientX - containerOffset.horizontal) / props.scale))
      .set('y2', Math.round((e.clientY - containerOffset.vertical) / props.scale));

    if (annotation.get('x2') < annotation.get('x1')) {
      const newAnnotation = annotation
        .set('x1', annotation.get('x2'))
        .set('x2', annotation.get('x1'));
      annotation = newAnnotation;
    }

    if (annotation.get('y2') < annotation.get('y1')) {
      const newAnnotation = annotation
        .set('y1', annotation.get('y2'))
        .set('y2', annotation.get('y1'));

      annotation = newAnnotation;
    }

    // Only save the pending change if the mark is bigger than a single point
    // In this case, vertical or horizontal lines are allowed
    if (Math.abs(annotation.get('x2') - annotation.get('x1')) < 1
      && Math.abs(annotation.get('y2') - annotation.get('y1')) < 1) {
        setPendingAnnotation(null);
    }
    else {
      setPendingAnnotation(annotation);
    }
  };

  const switchMode = (mode: Mode) => {
    //console.log('mode is now: ' + mode);
    setMode(mode);

    if (pendingAnnotation) {
      cancelAnnotation();
    }
  };

  const saveAnnotation = (content: string) => {
    if (!pendingAnnotation) return;

    const a = pendingAnnotation
      .set('content', content)
      .set('timeStamp', new Date());

    props.onSave(a);
    setPendingAnnotation(null);
  };

  const deleteAnnotation = (id: number) => {
    props.onDelete(id);
  };

  // If editing, pull the annotation out and put it in pending, force viewer to null
  const editAnnotation = (id: number) => {
    const annotation = props.annotations.find((value) => {
      if (value.get('id') === id) return true;
      return false;
    });

    setPendingAnnotation(annotation);
    setVisibleViewerId(0);
  };

  const cancelAnnotation = () => {
    // TODO: This delays the close event by 50ms to prevent any other click events from firing
    // Is this gross? I don't even know. Think about it some more and change if it is.
    // Hard to see how to do this without timers or screwing up component isolation
    setTimeout(() => {
      setPendingAnnotation(null);
    }, 50);
  };

  const displayAnnotationViewer = (id: number) => {
    if (pendingAnnotation) return;

    clearTimeout(viewerHideTimer.current);

    // If a onSelect handler has been provided, invoke it
    if (props.onSelect) {
      props.onSelect(id);
    }
    setVisibleViewerId(id);
  };

  const hideAnnotationViewer = (id: number) => {
    clearTimeout(viewerHideTimer.current);

    viewerHideTimer.current = setTimeout(() => {
      // If a onDeselect handler has been provided, invoke it
      if (props.onDeselect) {
        props.onDeselect();
      }
      setVisibleViewerId(0);
    }, 250);
  };

  const pA = pendingAnnotation;

  let pAnnotationComponent: JSX.Element | null = null;
  if (pA && !props.hidden) {
    pAnnotationComponent = <Annotation id={pA.get('id')}
      allowDelete={false}
      allowEdit={false}
      content={pA.get('content')}
      pending={true}
      priority={0}
      drawing={pA.get('drawing')}
      saveAnnotation={saveAnnotation}
      cancelAnnotation={cancelAnnotation}
      deleteAnnotation={deleteAnnotation}
      editAnnotation={editAnnotation}
      deemphasize={false}
      type={pA.get('type')}
      containerOffset={containerOffset}
      author={pA.get('author')}
      viewOnlyMode={false}
      x1={pA.get('x1') * props.scale}
      y1={pA.get('y1') * props.scale}
      x2={pA.get('x2') * props.scale}
      y2={pA.get('y2') * props.scale} />;
  }

  // Sorting the annotations: largest area to smallest area, then highlights, then markers
  // This allows us to assign a priority with biggest shapes being lowest in order to
  // calculate a z-index that stacks them accordingly
  const sortedAnnotations = props.annotations.sort((a1, a2) => {
    const m1 = a1.toJS();
    const m2 = a2.toJS();

    if (m1.type === 'marker' || m2.type === 'marker') {
      if (m1.type === m2.type) return 0;
      if (m1.type === 'marker') return 1;
      return -1;
    }

    if (m1.type === 'highlight' || m2.type === 'highlight') {
      if (m1.type === m2.type) return 0;
      if (m1.type === 'highlight') return 1;
      return -1;
    }

    const m1Area = Math.abs((m1.x1 - m1.x2) * (m1.y1 - m1.y2));
    const m2Area = Math.abs((m2.x1 - m2.x2) * (m2.y1 - m2.y2));

    return m2Area - m1Area;
  });

  let annotations = '';
  if (!props.hidden) {
    annotations = sortedAnnotations.map((a, i) => {
      return (
        <Annotation 
          allowDelete={props.allowDelete}
          allowEdit={props.allowEdit}
          key={a.get('id')}
          id={a.get('id')}
          priority={i + 1}
          content={a.get('content')}
          timeStamp={a.get('timeStamp')}
          pending={false}
          shouldDisplayViewer={a.get('id') === visibleViewerId}
          deemphasize={visibleViewerId !== 0 && a.get('id') !== visibleViewerId}
          displayAnnotationViewer={displayAnnotationViewer}
          hideAnnotationViewer={hideAnnotationViewer}
          deleteAnnotation={deleteAnnotation}
          editAnnotation={editAnnotation}
          saveAnnotation={saveAnnotation}
          cancelAnnotation={cancelAnnotation}
          viewOnlyMode={props.viewOnlyMode}
          type={a.get('type')}
          author={a.get('author')}
          containerOffset={containerOffset}
          x1={a.get('x1') * props.scale}
          y1={a.get('y1') * props.scale}
          x2={a.get('x2') * props.scale}
          y2={a.get('y2') * props.scale} />
      );
    });
  }


  return (
    <div ref={cdContainer} className='cd-container' style={{backgroundColor: 'rgba(0,0,0,0)' /*IE 10 click event workaround*/ }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove} >
      {props.viewOnlyMode || <ModeToggle mode={mode} switchMode={switchMode} />}
      {annotations}
      {pAnnotationComponent}
    </div>
  );
};

Container.defaultProps = defaultProps;

export default Container;