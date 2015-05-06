/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation component
 */

'use strict';

// External
let React = require('react/addons');

// Local
let Marker = require('./Marker');
let Square = require('./Square');
let Circle = require('./Circle');
let Highlight = require('./Highlight');
let Content = require('./Content');
let Input = require('./Input');

let Annotation = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    x1: React.PropTypes.number.isRequired,
    y1: React.PropTypes.number.isRequired,
    pending: React.PropTypes.bool.isRequired,
    drawing: React.PropTypes.bool.isRequired,
    deleteAnnotation: React.PropTypes.func.isRequired,
    shouldDisplayViewer: React.PropTypes.bool.isRequired,
    type: React.PropTypes.string.isRequired,

    //Optional
    x2: React.PropTypes.number,
    y2: React.PropTypes.number,
    timeStamp: React.PropTypes.number,
    displayAnnotationViewer: React.PropTypes.func,
    hideAnnotationViewer: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      drawing: false,
      shouldDisplayViewer: false
    };
  },

  handleMouseOver(e) {
    e.stopPropagation();
    if (this.props.pending) return;
    this.props.displayAnnotationViewer(this.props.id);
  },

  handleMouseOut(e) {
    e.stopPropagation();
    if (this.props.pending) return;
    this.props.hideAnnotationViewer(this.props.id);
  },

  handleClick(e) {
    // Allow markers to be placed inside shapes, but not on other markers
    if (this.props.type === 'marker') e.stopPropagation();
  },

  render() {
    // Desctructing is on one line b/c vim indenting gets confused
    let {x1, y1, x2, y2, displayAnnotationViewer, hideAnnotationViewer, ...other} = this.props;

    let width = Math.abs(x1 - x2);
    let height = Math.abs(y1 - y2);

    // Figure out what direction the mouse is dragging. 1 === left to right, up to down
    let xDir = x2 - x1 >= 0 ? 1 : -1;
    let yDir = y2 - y1 >= 0 ? 1 : -1;

    let divStyle = {
      left: xDir === 1 ? x1 : x2,
      top: yDir === 1 ? y1 : y2,
    };

    let indicator = '';
    let invert = y1 - 120 <= 0 ? true : false;

    switch(this.props.type) {
      case 'marker':
        indicator = <Marker id={this.props.id} priority={this.props.priority} />;
      break;
      case 'square':
        indicator = <Square id={this.props.id} width={width} height={height} priority={this.props.priority} />;
      break;
      case 'circle':
        // For circles, we need to use the biggest mouse value as diameter
        width = height = Math.max(width,height);
        indicator = <Circle id={this.props.id} width={width} height={height} priority={this.props.priority} />;
      break;
      case 'highlight':
        //   divStyle.top = y1;  // Force back to y1, highlights must stay on same vertical height
        indicator = <Highlight id={this.props.id} width={width} priority={this.props.priority} />;
      break;
    }

    let contentComponent = !this.props.drawing && !this.props.pending ? <Content invert={invert} shapeHeight={height} shapeWidth={width} {...other} /> : '';
    let inputComponent = !this.props.drawing && this.props.pending ? <Input invert={invert} shapeHeight={height} shapeWidth={width} {...other} /> : '';

    return (
      <div style={divStyle} className={'cd-annotation ' + this.props.type} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleClick}>
        {contentComponent}
        {inputComponent}
        {indicator}
      </div>
    );
  }
});

module.exports = Annotation;
