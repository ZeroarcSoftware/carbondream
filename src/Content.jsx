/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Pop-up annotation Content
 */

// External
var React = require('react/addons');
var ClassNames = require('classnames');
var Timeago = require('timeago');

// Local
var Input = require('./Input');


var Content = React.createClass({
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
    var viewerClasses = ClassNames({
      'cd-annotation-viewer': true,
      'hidden': this.props.pending || !this.props.shouldDisplayViewer,   //Hide if we are NOT pending and we SHOULD NOT display
    });

    var contentClasses = ClassNames({
      'cd-annotation-content': true,
    });

    var controlClasses = ClassNames({
      'cd-annotation-content-controls': true,
      'fade-in': this.state.shouldDisplayControls,
    });

    var divStyle = this.props.verticalOffset ? {top: (this.props.verticalOffset/2 - 20) + 'px'} : {};

    // Inner shadow-helper class is used to help z-index the text over the shadow/comment bubble
    return (
      <div style={divStyle} className={viewerClasses}>
        <div className='cd-shadow-bubble'>
        </div>
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
