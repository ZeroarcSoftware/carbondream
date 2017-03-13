/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Input dialog for annotation
 */

'use strict';

// External
import React from 'react';
import ClassNames from 'classnames';
import Autobind from 'autobind-decorator';


@Autobind
export default class Input extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {value: props.content};
  }

  render() {
    const editorClasses = ClassNames({
      'cd-annotation-editor': true,
      'hidden': !this.props.pending,
    });

    const inputClasses = ClassNames({
      'cd-annotation-input': true,
    });

    const shadowClasses = ClassNames({
      'cd-shadow-bubble': true,
      'invert': this.props.invert,
    });

    // Apply offsets for outer div
    const divStyle = {
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

    const saveClasses = ClassNames('btn btn-xs save', {
      disabled: !this.state.value.length
    });

    const cancelClasses = ClassNames('btn btn-xs cancel');

    //HACK: Using onInput instead of onChange see: https://github.com/facebook/react/issues/7027
    //DISABLED: onKeyDown={this.handleKeyDown}
    return (
      <div style={divStyle} className={editorClasses}>
        <div style={shadowStyle} className={shadowClasses}></div>
        <div className={inputClasses}>
          <textarea autoFocus
            value={this.state.value}
            onInput={this.handleChange}
            onBlur={this.handleBlur}
          />
          <div className='cd-annotation-input-controls'>
            <button className={cancelClasses} onClick={this.handleCancelClick}><i className='fa fa-fw fa-times'></i> Cancel</button>
            <button className={saveClasses} onClick={this.handleSaveClick}><i className='fa fa-fw fa-check'></i> Save</button>
          </div>
        </div>
      </div>
    );
  }

  //
  // Custom methods
  //

  handleChange(e) {
    e.stopPropagation();
    this.setState({value: e.target.value});
  }

  handleSaveClick(e) {
    e.stopPropagation();
    this.props.saveAnnotation(this.state.value);
  }

  handleCancelClick(e) {
    e.stopPropagation();
    this.props.cancelAnnotation();
  }

  /*
  handleKeyDown(e) {
    e.stopPropagation();

    // Capture escape key to cancel
    if (e.keyCode === 27 && this.state.value.length === 0) this.props.cancelAnnotation();
  }
  */

  handleBlur(e) {
    e.stopPropagation();

    // If the textarea blurs with no input, the user has clicked or tabbed out. Cancel.
    if (this.state.value.length === 0) this.props.cancelAnnotation();
  }
}

Input.propTypes = {
  content: React.PropTypes.string.isRequired,
  pending: React.PropTypes.bool.isRequired,
  saveAnnotation: React.PropTypes.func,
  cancelAnnotation: React.PropTypes.func,
};
