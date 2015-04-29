/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Input dialog for annotation
 */

// External
var React = require('react/addons');
var ClassNames = require('classnames');


var Input = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    content: React.PropTypes.string.isRequired,
    pending: React.PropTypes.bool.isRequired,
    handleAnnotationSave: React.PropTypes.func,
    handleAnnotationCancel: React.PropTypes.func,
  },

  getInitialState() {
    return {value: this.props.content};
  },

  handleChange(e) {
    this.setState({value: event.target.value});
  },

  handleSaveClick(e) {
    e.preventDefault();
    this.props.handleAnnotationSave(this.props.id, this.state.value);
  },

  handleCancelClick(e) {
    e.preventDefault();
    this.props.handleAnnotationCancel(this.props.id);
  },

  render() {
    var textAreaStyle = {
      minHeight: '5.5em'
    };

    if (this.state.value.length) {
      var ems = Math.min(Math.floor(this.state.value.length / 30) + 5.5, 14);
      textAreaStyle.minHeight = ems + 'em';
    }

    var editorClasses = ClassNames({
      'cd-annotation-editor': true,
      'hidden': !this.props.pending,
    });

    var inputClasses = ClassNames({
      'cd-annotation-input': true,
    });

    return (
      <div className={editorClasses}>
        <div className='cd-shadow-bubble'>
        </div>
        <div className={inputClasses}>
          <textarea style={textAreaStyle} value={this.state.value} onChange={this.handleChange} />
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
