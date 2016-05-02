/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Annotation component
 */

'use strict';

// External
let React = require('react');
let Autobind = require('autobind-decorator');

// Local
import Marker from './Marker';
import Square from './Square';
import Circle from './Circle';
import Highlight from './Highlight';
import Content from './Content';
import Input from './Input';

// Globals
let BUBBLEDIM = {width: 260, height: 120};


@Autobind
export default class Annotation extends React.Component {
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

    // Default offsets based on height/width of bubble
    let offset = {
      vertical: -BUBBLEDIM.height - 10,
      horizontal: width/2 - BUBBLEDIM.width / 2,
    };

    let indicator = '';


    switch(this.props.type) {
      case 'marker':
        indicator = <Marker deemphasize={this.props.deemphasize} priority={this.props.priority} />;
        offset.vertical -= 25;
        height = 0;
        offset.horizontal = -BUBBLEDIM.width / 2;
      break;
      case 'square':
        indicator = <Square deemphasize={this.props.deemphasize} width={width} height={height} priority={this.props.priority} />;
      break;
      case 'circle':
        // For circles, we need to use the biggest mouse value as diameter
        width = height = Math.max(width,height);
        indicator = <Circle deemphasize={this.props.deemphasize} width={width} height={height} priority={this.props.priority} />;
      break;
      case 'highlight':
        divStyle.top = y1;  // Force back to y1, highlights must stay on same vertical height
        height = 21; // Force height of highlight to allow correct bubble placement
        indicator = <Highlight deemphasize={this.props.deemphasize} width={width} priority={this.props.priority} />;
      break;
    }

    // If we are going to push above the viewport, invert the bubble and modify the offset to draw below
    let invert = y1 + offset.vertical - 10 + this.props.containerOffset.top <= 0 ? true : false;
    if (invert) offset.vertical = height + 36;

    // Check to see if we are going to draw past the left or right side of the viewport.
    let viewPortWidth = document.documentElement.clientWidth - this.props.containerOffset.left;

    let pushHorizontal = x1 + (width/2 - BUBBLEDIM.width / 2) + this.props.containerOffset.left <= 0 ? true : false;
    let pullHorizontal = x1 + (width/2 + BUBBLEDIM.width / 2) >= viewPortWidth ? true : false;

    // If we need to push or pull the bubble, recalculate the offsets based on bubble size and
    // marker position. This was fun to figure out. The 5 is just there for additional padding.
    if (pushHorizontal) {
      let additionalOffset = offset.horizontal + x1 - 5;
      offset.horizontal = offset.horizontal - additionalOffset;

      if (this.props.type !== 'marker')
        offset.shadow = x1 + width/2 - 14;
      else
        offset.shadow = x1 - 14;
    }
    else if (pullHorizontal) {
      let additionalOffset = viewPortWidth - (BUBBLEDIM.width + 5) - offset.horizontal - x1;
      offset.horizontal = offset.horizontal + additionalOffset;

      if (this.props.type !== 'marker')
        offset.shadow = -offset.horizontal + width/2 - 10;
      else
        offset.shadow = -offset.horizontal - 10;
    }

    let contentComponent = !this.props.drawing && !this.props.pending
      ?  <Content invert={invert} pushHorizontal={pushHorizontal} pullHorizontal={pullHorizontal} offset={offset} {...other} />
      : '';
    let inputComponent = !this.props.drawing && this.props.pending
      ? <Input invert={invert} pushHorizontal={pushHorizontal} pullHorizontal={pullHorizontal} offset={offset} {...other} />
      : '';

    return (
      <div style={divStyle} className={'cd-annotation ' + this.props.type} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleClick}>
        {contentComponent}
        {inputComponent}
        {indicator}
      </div>
    );
  }

  //
  // Custom Methods
  //

  handleMouseOver(e) {
    e.stopPropagation();
    if (this.props.pending) return;
    this.props.displayAnnotationViewer(this.props.id);
  }

  handleMouseOut(e) {
    e.stopPropagation();
    if (this.props.pending) return;
    this.props.hideAnnotationViewer(this.props.id);
  }

  handleClick(e) {
    // Allow markers to be placed inside shapes, but not on other markers
    if (this.props.type === 'marker') e.stopPropagation();
  }
}

Annotation.defaultProps = {
  drawing: false,
  shouldDisplayViewer: false
};

Annotation.propTypes = {
  content: React.PropTypes.string.isRequired,
  x1: React.PropTypes.number.isRequired,
  y1: React.PropTypes.number.isRequired,
  x2: React.PropTypes.number.isRequired,
  y2: React.PropTypes.number.isRequired,
  pending: React.PropTypes.bool.isRequired,
  drawing: React.PropTypes.bool.isRequired,
  deleteAnnotation: React.PropTypes.func.isRequired,
  shouldDisplayViewer: React.PropTypes.bool.isRequired,
  deemphasize: React.PropTypes.bool.isRequired,
  type: React.PropTypes.string.isRequired,
  containerOffset: React.PropTypes.object.isRequired,
  viewOnlyMode: React.PropTypes.bool.isRequired,

  // Optional
  timeStamp: React.PropTypes.instanceOf(Date),
  displayAnnotationViewer: React.PropTypes.func,
  hideAnnotationViewer: React.PropTypes.func,
};
