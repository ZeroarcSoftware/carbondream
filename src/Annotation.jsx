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
    e.stopPropagation();
  },

  render() {
    // Desctructing is on one line b/c vim indenting gets confused
    let {x1, y1, x2, y2, displayAnnotationViewer, hideAnnotationViewer, ...other} = this.props;

    x2 = x2 || x1;
    y2 = y2 || y1;

    // If x2 or y2 is defined, calculate dimensions, otherwise
    // set to the same as x1,y1
    let width = Math.abs(x1 - x2);
    let height = Math.abs(y1 - y2);

    // Figure out what direction the mouse is dragging. 1 === left to right, up to down
    let xDir = x2 - x1 >= 0 ? 1 : -1;
    let yDir = y2 - y1 >= 0 ? 1 : -1;

    let divStyle = {
      left: xDir === 1 ? x1 : x2,
      top: yDir === 1 ? y1 : y2,
    };

    // Force some min height and width if we are displaying
    if (this.props.shouldDisplayViewer || this.props.pending) {
      divStyle.minHeight = height + 'px';
      divStyle.minWidth = width + 230 + 'px';
    }

    let indicator = '';
    let verticalOffset = null;


    switch(this.props.type) {
      case 'marker':
        indicator = <Marker id={this.props.id} />;
      break;
      case 'square':
        verticalOffset = height;
        indicator = <Square id={this.props.id} width={width} height={height} />;
      break;
      case 'circle':
        // For circles, we need to use the biggest mouse value as diameter
        let diameter = Math.max(width,height);
        verticalOffset = diameter;

        // We have to adjust the outer div differently for circles for proper alignment
        if (this.props.shouldDisplayViewer || this.props.pending) {
          divStyle.minHeight = diameter + 'px';
          divStyle.minWidth = diameter + 230 + 'px';
        }

        indicator = <Circle id={this.props.id} width={diameter} height={diameter} />;
      break;
      case 'highlight':
        divStyle.top = y1;  // Force back to y1, highlights must stay on same vertical height
        indicator = <Highlight id={this.props.id} width={width} />;
      break;
    }

    let contentComponent = !this.props.drawing && !this.props.pending ? <Content verticalOffset={verticalOffset} {...other} /> : '';
    let inputComponent = !this.props.drawing && this.props.pending ? <Input verticalOffset={verticalOffset} {...other} /> : '';

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
