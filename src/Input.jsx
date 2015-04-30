/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Input dialog for annotation
 */
'use strict';

// External
var React = require('react/addons');
var ClassNames = require('classnames');


var Input = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
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
    this.props.saveAnnotation(this.props.id, this.state.value);
  },

  handleCancelClick(e) {
    e.stopPropagation();
    this.props.cancelAnnotation(this.props.id);
  },

  render() {
    var textAreaStyle = {
      minHeight: '6.5em'
    };

    // Allow input area to grow to a certain length before using scroll bar
    if (this.state.value.length) {
      var ems = Math.min(Math.floor(this.state.value.length / 30) + 6.5, 14);
      textAreaStyle.minHeight = ems + 'em';
    }

    var editorClasses = ClassNames({
      'cd-annotation-editor': true,
      'hidden': !this.props.pending,
    });

    var inputClasses = ClassNames({
      'cd-annotation-input': true,
    });


    // If we are passed a vertical offset, adjust it for the comment bubble and use it
    var divStyle = this.props.verticalOffset ? {top: (this.props.verticalOffset/2 - 20) + 'px'} : {};

    return (
      <div style={divStyle} className={editorClasses}>
        <div className='cd-shadow-bubble'>
        </div>
        <div className={inputClasses}>
          <textarea autoFocus style={textAreaStyle} value={this.state.value} onChange={this.handleChange} />
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
