/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Input dialog for annotation
 */
'use strict';

// External
let React = require('react/addons');
let ClassNames = require('classnames');


let Input = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    pending: React.PropTypes.bool.isRequired,
    saveAnnotation: React.PropTypes.func,
    cancelAnnotation: React.PropTypes.func,
  },

  getInitialState() {
    return {value: this.props.content};
  },

  handleChange(e) {
    this.setState({value: event.target.value});
  },

  handleSaveClick(e) {
    e.stopPropagation();
    this.props.saveAnnotation(this.state.value);
  },

  handleCancelClick(e) {
    e.stopPropagation();
    this.props.cancelAnnotation();
  },

  handleKeyDown(e) {
    e.stopPropagation();

    // Capture escape key to cancel
    if (e.keyCode === 27 && this.state.value.length === 0) this.props.cancelAnnotation();
  },

  handleBlur(e) {
    e.stopPropagation();

    // If the textarea blurs with no input, the user has clicked or tabbed out. Cancel.
    if (this.state.value.length === 0) this.props.cancelAnnotation();
  },

  render() {
    let editorClasses = ClassNames({
      'cd-annotation-editor': true,
      'hidden': !this.props.pending,
    });

    let inputClasses = ClassNames({
      'cd-annotation-input': true,
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
      <div style={divStyle} className={editorClasses}>
        <div style={shadowStyle} className={shadowClasses}></div>
        <div className={inputClasses}>
          <textarea autoFocus
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
          />
          <div className='cd-annotation-input-controls'>
            <button className='save' onClick={this.handleSaveClick}><i className='fa fa-check'> Save</i></button>
            <button className='cancel' onClick={this.handleCancelClick}><i className='fa fa-times'> Cancel</i></button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Input;
