/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Top level container component
 */

'use strict';

// External
let React = require('react/addons');
let Immutable = require('immutable');

// Local
let Annotation = require('./Annotation');
let ModeToggle = require('./ModeToggle');


let Container = React.createClass({
  propTypes: {
    annotations: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    scale: React.PropTypes.number.isRequired,
    hidden: React.PropTypes.bool.isRequired,
    // Optional
    selectedId: React.PropTypes.number.isRequired,
    onSelect: React.PropTypes.func,
    onDeselect: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      selectedId: 0,
      scale: 1,
      hidden: false,
    };
  },

  getInitialState() {
    return {
      pendingAnnotation: null,
      visibleViewerId: this.props.selectedId || 0,
      mode: 'marker',
      containerOffset: {top: 0, left: 0},
    };
  },

  // Listen for props in order to overwrite visible viewer with prop
  componentWillReceiveProps(nextProps) {
    this.setState({visibleViewerId: nextProps.selectedId});
  },

  componentDidMount() {
    window.addEventListener("scroll", this.updateOffset);
    this.updateOffset();
  },

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateOffset);
  },

  updateOffset() {
    let offset = this.offset(React.findDOMNode(this));
    this.setState({containerOffset: offset});
  },

  offset(element) {
    let documentElem;
    let box = { top: 0, left: 0 };
    let doc = element && element.ownerDocument;

    if (!doc) {
      return;
    }

    documentElem = doc.documentElement;
    box = element.getBoundingClientRect();

    return {
      top: box.top,
      left: box.left,
    };
  },

  handleClick(e) {
    e.stopPropagation();

    if (this.state.pendingAnnotation
      || this.state.mode !== 'marker') return;

    //console.log('click fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    let annotation = Immutable.Map({
      content: '',
      timeStamp: new Date(),
      type: this.state.mode,
      x1: Math.round((e.clientX - this.state.containerOffset.left) / this.props.scale),
      y1: Math.round((e.clientY - this.state.containerOffset.top) / this.props.scale),
      x2: Math.round((e.clientX + 14 - this.state.containerOffset.left) / this.props.scale), //14 & 24 are the size of the marker
      y2: Math.round((e.clientY + 24 - this.state.containerOffset.top) / this.props.scale),
    });

    this.setState({
      pendingAnnotation: annotation
    });
  },

  handleMouseDown(e) {
    e.stopPropagation();

    if (this.state.pendingAnnotation || this.state.visibleViewerId || this.state.mode === 'marker') return;

    //console.log('mousedown fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    let annotation = Immutable.Map({
      content: '',
      timeStamp: new Date(),
      type: this.state.mode,
      drawing: true,
      x1: Math.round((e.clientX - this.state.containerOffset.left) / this.props.scale),
      y1: Math.round((e.clientY - this.state.containerOffset.top) / this.props.scale),
      x2: Math.round((e.clientX - this.state.containerOffset.left) / this.props.scale),
      y2: Math.round((e.clientY - this.state.containerOffset.top) / this.props.scale),
    });

    this.setState({
      pendingAnnotation: annotation,
    });
  },

  handleMouseMove(e) {
    e.stopPropagation();

    if (this.state.visibleViewerId || this.state.mode === 'marker' || !this.state.pendingAnnotation) return;

    // If drawing is not true, then don't proceed
    if (!this.state.pendingAnnotation.get('drawing')) return;

    //console.log('mousemove fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    let annotation = this.state.pendingAnnotation
    .set('x2', (e.clientX - this.state.containerOffset.left) / this.props.scale)
    .set('y2', (e.clientY - this.state.containerOffset.top) / this.props.scale);

    this.setState({pendingAnnotation: annotation});
  },

  handleMouseUp(e) {
    e.stopPropagation();

    if (this.state.visibleViewerId || this.state.mode === 'marker' || !this.state.pendingAnnotation) return;

    // If drawing is false, we have already popped the input dialog
    if (!this.state.pendingAnnotation.get('drawing')) return;

    //console.log('mouseup fired. clientX: ' + e.clientX + ', clientY: ' + e.clientY + ', screenX: ' + e.screenX + ', screenY: ' + e.screenY);

    let annotation = this.state.pendingAnnotation
    .set('drawing', false)
    .set('x2', Math.round((e.clientX - this.state.containerOffset.left) / this.props.scale))
    .set('y2', Math.round((e.clientY - this.state.containerOffset.top) / this.props.scale));

    if (annotation.get('x2') < annotation.get('x1')) {
      let newAnnotation = annotation
      .set('x1', annotation.get('x2'))
      .set('x2', annotation.get('x1'));
      annotation = newAnnotation;
    }

    if (annotation.get('y2') < annotation.get('y1')) {
      let newAnnotation = annotation
      .set('y1', annotation.get('y2'))
      .set('y2', annotation.get('y1'));

      annotation = newAnnotation;
    }

    // Only save the pending change if the mark is bigger than a single point
    // In this case, vertical or horizontal lines are allowed
    if (Math.abs(annotation.get('x2') - annotation.get('x1')) < 1
        && Math.abs(annotation.get('y2') - annotation.get('y1')) < 1) {
          this.setState({pendingAnnotation: null});
        }
        else {
          this.setState({pendingAnnotation: annotation});
        }
  },

  switchMode(mode) {
    //console.log('mode is now: ' + mode);
    this.setState({mode: mode});

    if (this.state.pendingAnnotation) {
      this.cancelAnnotation();
    }
  },

  saveAnnotation(content) {
    let a = this.state.pendingAnnotation
    .set('content', content)
    .set('timeStamp', new Date());

    this.props.onSave(a);
    this.setState({pendingAnnotation: null});
  },

  deleteAnnotation(id) {
    this.props.onDelete(id);
  },

  // If editing, pull the annotation out and put it in pending, force viewer to null
  editAnnotation(id) {
    let annotation = this.props.annotations.find((value) => {
      if (value.get('id') === id) return true;
      return false;
    });

    this.setState({
      pendingAnnotation: annotation,
      visibleViewerId: 0
    });
  },

  cancelAnnotation() {
    // TODO: This delays the close event by 50ms to prevent any other click events from firing
    // Is this gross? I don't even know. Think about it some more and change if it is.
    // Hard to see how to do this without timers or screwing up component isolation
    setTimeout(() => {
      this.setState({pendingAnnotation: null});
    }, 50);
  },

  displayAnnotationViewer(id) {
    if (this.state.pendingAnnotation) return;

    clearTimeout(this.viewerHideTimer);

    // If a onSelect handler has been provided, invoke it
    if (this.props.onSelect) {
      this.props.onSelect(id);
    }
    this.setState({visibleViewerId: id});
  },

  hideAnnotationViewer(id) {
    clearTimeout(this.viewerHideTimer);

    this.viewerHideTimer = setTimeout(() => {
      // If a onDeselect handler has been provided, invoke it
      if (this.props.onDeselect) {
        this.props.onDeselect();
      }
      this.setState({visibleViewerId: 0});
    }, 250);
  },

  render() {
    let pA = this.state.pendingAnnotation && this.state.pendingAnnotation.toJS();

    let pAnnotationComponent = '';
    if (this.state.pendingAnnotation && !this.props.hidden) {
      pAnnotationComponent = <Annotation id={pA.id}
        content={pA.content}
        pending={true}
        drawing={pA.drawing}
        saveAnnotation={this.saveAnnotation}
        cancelAnnotation={this.cancelAnnotation}
        deleteAnnotation={this.deleteAnnotation}
        deemphasize={false}
        type={pA.type}
        containerOffset={this.state.containerOffset}
        author={pA.author}
        x1={pA.x1 * this.props.scale}
        y1={pA.y1 * this.props.scale}
        x2={pA.x2 * this.props.scale}
        y2={pA.y2 * this.props.scale} />;
    }

    // Sorting the annotations: largest area to smallest area, then highlights, then markers
    // This allows us to assign a priority with biggest shapes being lowest in order to
    // calculate a z-index that stacks them accordingly
    let sortedAnnotations = this.props.annotations.sort((a1, a2) => {
      let m1 = a1.toJS();
      let m2 = a2.toJS();

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

      let m1Area = Math.abs((m1.x1 - m1.x2) * (m1.y1 - m1.y2));
      let m2Area = Math.abs((m2.x1 - m2.x2) * (m2.y1 - m2.y2));

      return m2Area - m1Area;
    });

    let annotations = '';
    if (!this.props.hidden) {
      annotations = sortedAnnotations.map((a, i) => {
        let m = a.toJS();
        return (
          <Annotation key={m.id}
            id={m.id}
            priority={i + 1}
            content={m.content}
            timeStamp={m.timeStamp}
            pending={false}
            shouldDisplayViewer={m.id === this.state.visibleViewerId}
            deemphasize={this.state.visibleViewerId !== 0 && m.id !== this.state.visibleViewerId}
            displayAnnotationViewer={this.displayAnnotationViewer}
            hideAnnotationViewer={this.hideAnnotationViewer}
            deleteAnnotation={this.deleteAnnotation}
            editAnnotation={this.editAnnotation}
            type={m.type}
            author={m.author}
            containerOffset={this.state.containerOffset}
            x1={m.x1 * this.props.scale}
            y1={m.y1 * this.props.scale}
            x2={m.x2 * this.props.scale}
            y2={m.y2 * this.props.scale} />
        );
      });
    }

    return (
      <div ref='cdContainer' className='cd-container'
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        >
        <ModeToggle mode={this.state.mode} switchMode={this.switchMode} />
        {annotations}
        {pAnnotationComponent}
      </div>
    );
  }
});

module.exports  = Container;
