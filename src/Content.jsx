/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Pop-up annotation Content
 */
'use strict';

// External
let React = require('react/addons');
let ClassNames = require('classnames');
let Timeago = require('timeago');

// Local
let Input = require('./Input');


let Content = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    content: React.PropTypes.string.isRequired,
    pending: React.PropTypes.bool.isRequired,
    shouldDisplayViewer: React.PropTypes.bool.isRequired,
    deleteAnnotation: React.PropTypes.func.isRequired,
    editAnnotation: React.PropTypes.func.isRequired,

    //Optional
    timeStamp: React.PropTypes.number,
    verticalOffset: React.PropTypes.number,
  },

  getInitialState() {
    return {shouldDisplayControls: false};
  },

  handleEditClick(e) {
    e.stopPropagation();
    this.props.editAnnotation(this.props.id);
  },

  handleDeleteClick(e) {
    e.stopPropagation();
    this.props.deleteAnnotation(this.props.id);
  },

  // These allow event propogation because parent needs mouse events
  handleMouseOver(e) {
    this.setState({shouldDisplayControls: true});
  },

  handleMouseOut(e) {
    this.setState({shouldDisplayControls: false});
  },

  render() {
    let viewerClasses = ClassNames({
      'cd-annotation-viewer': true,
      'hidden': this.props.pending || !this.props.shouldDisplayViewer,   //Hide if we are NOT pending and we SHOULD NOT display
    });

    let contentClasses = ClassNames({
      'cd-annotation-content': true,
    });

    let controlClasses = ClassNames({
      'cd-annotation-content-controls': true,
      'fade-in': this.state.shouldDisplayControls,
    });

    let shadowClasses = ClassNames({
      'cd-shadow-bubble': true,
      'invert': this.props.invert,
    });

    // These offsets are basically just figured out by trial and error
    let divStyle = {
      left: this.props.shapeWidth/2 - 130,
      top: this.props.invert ? 34 + this.props.shapeHeight : -120
    };

    return (
      <div style={divStyle} className={viewerClasses}>
        <div className={shadowClasses}></div>
        <div className={contentClasses} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <div className={controlClasses}>
            <button className='edit' onClick={this.handleEditClick}><i className='fa fa-check'> Edit</i></button>
            <button className='delete' onClick={this.handleDeleteClick}><i className='fa fa-times'> Delete</i></button>
          </div>
          <div className='cd-annotation-content-text'>
            {this.props.content}
          </div>
          <div className='cd-annotation-content-info'>
            Comment #{this.props.id} by Justin {Timeago(this.props.timeStamp)}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Content;
