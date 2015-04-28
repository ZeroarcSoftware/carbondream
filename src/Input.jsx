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
    var classNames = ClassNames({
      'cd-annotation-input': true,
      'hidden': !this.props.pending
    });

    return (
      <div className={classNames}>
        <div className='shadow-helper'>
          <input type='text' value={this.state.value} onChange={this.handleChange} />
          <a onClick={this.handleSaveClick}><i className='fa fa-check'></i></a>
          <a onClick={this.handleCancelClick}><i className='fa fa-times'></i></a>
        </div>
      </div>
    );
  }
});

module.exports = Input;
