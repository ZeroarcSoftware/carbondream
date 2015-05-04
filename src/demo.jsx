/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Entry point into component
 */
'use strict';

// External
let React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
let Reflux = require('reflux');

// Local
let Container = require('./Container');
let AnnotationStore = require('../test/AnnotationStore.js');
let AnnotationActions = require('../test/AnnotationActions.js');

let Demo = React.createClass({
  mixins: [PureRenderMixin, Reflux.connect(AnnotationStore, 'annotations')],

  handleAnnotationSave(annotation) {
    AnnotationActions.annotationSave(annotation);
  },

  handleAnnotationDelete(id) {
    AnnotationActions.annotationDelete(id);
  },

  render() {
    return (
      <Container
        annotations={this.state.annotations}
        onSave={this.handleAnnotationSave}
        onDelete={this.handleAnnotationDelete}
      />
    );
  }

});

console.log('Weaving a new carbon dream.');
document.addEventListener('DOMContentLoaded', () => {
  React.render(
    <Demo />
    , document.getElementById('content')
  );
});
