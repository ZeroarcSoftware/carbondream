/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Controls to toggle annotation modes
 */

'use strict';

var PropTypes = require('prop-types');

// External
let React = require('react');
let Autobind = require('autobind-decorator');


@Autobind
export default class ModeToggle extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className='cd-mode-toggle' onMouseUp={this.blockEvent} onMouseDown={this.blockEvent} onClick={this.blockEvent}>
        <button className={this.props.mode === 'marker' ? 'selected' : ''} onClick={this.handleClick('marker')} title='Switch to marker'><i className='fa fa-map-marker'></i></button>
        <button className={this.props.mode === 'square' ? 'selected' : ''} onClick={this.handleClick('square')} title='Switch to square'><i className='fa fa-square-o'></i></button>
        <button className={this.props.mode === 'circle' ? 'selected' : ''} onClick={this.handleClick('circle')} title='Switch to circle'><i className='fa fa-circle-o'></i></button>
        <button className={this.props.mode === 'highlight' ? 'selected' : ''} onClick={this.handleClick('highlight')} title='Switch to highlight'><i className='fa fa-font'></i></button>
      </div>
    );
  }

  //
  // Custom Methods
  //

  handleClick(mode) {
    return (e) => {
      e.stopPropagation();
      this.props.switchMode(mode);
    };
  }

  // This is neccessary to prevent mouseup/down from triggering actions on parents
  blockEvent(e) {
    e.stopPropagation();
  }
}

ModeToggle.propTypes = {
  mode: PropTypes.string.isRequired,
  switchMode: PropTypes.func.isRequired,
};
