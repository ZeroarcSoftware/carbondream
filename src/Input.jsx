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
    let textAreaStyle = {
      minHeight: '6.5em'
    };

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

    // These offsets are basically just figured out by trial and error
    let divStyle = {
      left: this.props.offset.horizontal,
      top: this.props.offset.vertical,
    };

    return (
      <div style={divStyle} className={editorClasses}>
        <div className={shadowClasses}></div>
        <div className={inputClasses}>
          <textarea autoFocus
            style={textAreaStyle}
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
