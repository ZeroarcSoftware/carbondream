/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Demo top level component. Integrates reflux for local storage.
 */

'use strict';

// External
let React = require('react');
let ReactDOM = require('react-dom');
let ReactShallowCompare = require('react-addons-shallow-compare');
let Reflux = require('reflux');
let Immutable = require('immutable');
let Autobind = require('autobind-decorator');

// Local
let Container = require('./Container');
let AnnotationStore = require('../test/AnnotationStore.js');
let AnnotationActions = require('../test/AnnotationActions.js');


@Autobind
class Demo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {annotations: AnnotationStore.getInitialState()};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return ReactShallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    this.unsubscribe = AnnotationStore.listen(this.onStoreChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Container annotations={this.state.annotations}
        onSave={this.handleAnnotationSave}
        onDelete={this.handleAnnotationDelete}
      />
    );
  }

  //
  // Custom methods
  //

  onStoreChange(annotations) {
    this.setState({
      annotations: annotations
    });
  }

  handleAnnotationSave(annotation) {
    AnnotationActions.annotationSave(annotation);
  }

  handleAnnotationDelete(id) {
    AnnotationActions.annotationDelete(id);
  }

  handleClick(e) {
    e.stopPropagation();
    localStorage.clear();
  }
}

console.log('Weaving a new carbon dream.');
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Demo />
    , document.getElementById('content')
  );
});
