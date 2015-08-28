/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Pop-up annotation Content
 */
'use strict';

// External
let React = require('react/addons');
let ClassNames = require('classnames');
let Timeago = require('react-timeago');

// Local
let Input = require('./Input');


let Content = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    author: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    pending: React.PropTypes.bool.isRequired,
    shouldDisplayViewer: React.PropTypes.bool.isRequired,
    deleteAnnotation: React.PropTypes.func.isRequired,
    editAnnotation: React.PropTypes.func.isRequired,
    offset: React.PropTypes.object.isRequired,

    //Optional
    timeStamp: React.PropTypes.instanceOf(Date),
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

    // Apply offsets for outer div
    let divStyle = {
      left: this.props.offset.horizontal,
      top: this.props.offset.vertical,
    };

    // Apply offsets for shadow bubble. Trial and error to figure
    // out the maximums
    let shadowStyle = {};
    if (this.props.pushHorizontal || this.props.pullHorizontal) {
      shadowStyle.left = this.props.offset.shadow || -this.props.offset.horizontal - 4;

      if (shadowStyle.left < 6)
        shadowStyle.left = 6;
      else if (shadowStyle.left > 234)
        shadowStyle.left = 234;
    }

    return (
      <div style={divStyle} className={viewerClasses}>
        <div style={shadowStyle} className={shadowClasses}></div>
        <div className={contentClasses} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <div className={controlClasses}>
            <button className='delete' onClick={this.handleDeleteClick}><i className='fa fa-times'> Delete</i></button>
            <button className='edit' onClick={this.handleEditClick}><i className='fa fa-pencil'> Edit</i></button>
          </div>
          <div className='cd-annotation-content-text'>
            {this.props.content}
          </div>
          <div className='cd-annotation-content-info'>
            Comment #{this.props.id} by {this.props.author} <Timeago date={this.props.timeStamp} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Content;
