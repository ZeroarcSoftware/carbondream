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
    if (!annotation.get('Id')) {
      annotation = annotation.set('Id', this.lastId + 1);
    }
    // Otherwise look for it in the existing list
    else {
      index = this.annotations.findIndex((value) => {
        if (value.get('Id') === annotation.get('Id')) return true;
        return false;
      });
    }

    // Update or add annotation accordingly
    let a = Immutable.Map(annotation);
    a.selected = false;

    if (index >= 0) {
      this.annotations = this.annotations.set(index, a);
    }
    else {
      this.annotations = this.annotations.push(a);
    }

    // Only change the Id if its higher, in case we are editing
    this.lastId = Math.ceil(annotation.get('Id'), this.lastId);

    localStorage['annotationState'] = JSON.stringify({
      annotations: this.annotations.toJS(),
      lastId: this.lastId
    });

    this.trigger(this.annotations);

  },

  annotationDelete(id) {
    let index = this.annotations.findIndex((value) => {
      if (value.get('Id') === id) return true;
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
