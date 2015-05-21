/* carbondream - Copyright 2015 Zeroarc Software, LLC
 *
 * Demo: Annotation Reflux Store
 */

'use strict';

//External
let Reflux = require('reflux');
let Immutable = require('immutable');

//Local
let AnnotationActions = require('./AnnotationActions');


let AnalysisStore = Reflux.createStore({
  listenables: [AnnotationActions],

  getInitialState() {
    let stateJSON = localStorage['annotationState'] || '{}';
    let state = JSON.parse(stateJSON);

    let annotations = state.annotations || [];
    let annotationMaps = annotations.map((a) => {
      a.selected = false;
      return Immutable.Map(a);
    }); // Project to immutable maps

    this.annotations = Immutable.List(annotationMaps); // Wrap maps in list

    this.lastId = state.lastId || 0;

    return this.annotations;
  },

  annotationSave(annotation) {
    console.log('annotationSave');
    let index = -1;

    // Check to see if this is a new annotation. If so, issue UID
    if (!annotation.get('id')) {
      annotation = annotation.set('id', this.lastId + 1);
    }
    // Otherwise look for it in the existing list
    else {
      index = this.annotations.findIndex((value) => {
        if (value.get('id') === annotation.get('id')) return true;
        return false;
      });
    }

    // Update or add annotation accordingly
    annotation = annotation.set('author', 'Test User');

    if (index >= 0) {
      this.annotations = this.annotations.set(index, annotation);
    }
    else {
      this.annotations = this.annotations.push(annotation);
    }

    // Only change the Id if its higher, in case we are editing
    this.lastId = Math.ceil(annotation.get('id'), this.lastId);

    localStorage['annotationState'] = JSON.stringify({
      annotations: this.annotations.toJS(),
      lastId: this.lastId
    });

    this.trigger(this.annotations);

  },

  annotationDelete(id) {
    let index = this.annotations.findIndex((value) => {
      if (value.get('id') === id) return true;
      return false;
    });

    this.annotations = this.annotations.delete(index);

    localStorage['annotationState'] = JSON.stringify({
      annotations: this.annotations.toJS(),
      lastId: this.lastId
    });


    this.trigger(this.annotations);
  },
});

module.exports = AnalysisStore;
