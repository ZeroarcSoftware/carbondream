'use strict';

//External
var Reflux = require('reflux');


var AnnotationActions = Reflux.createActions([
  'annotationSave',
  'annotationDelete'
]);

module.exports = AnnotationActions;
