// @flow
// carbondream - Copyright 2017 Zeroarc Software, LLC
// Pop-up annotation Content
'use strict';

import React from 'react';
import ClassNames from 'classnames';
import Autobind from 'autobind-decorator';
import TimeAgo from 'react-timeago'

import Input from './Input';

import type { Offset } from './flowTypes';

type Props = {
  allowEdit: bool,
  allowDelete: bool,
  author: string,
  content: string,
  deleteAnnotation: (number) => void,
  editAnnotation: (number) => void,
  id: number,
  invert: bool,
  pending: bool,
  shouldDisplayViewer: bool,
  offset: Offset,
  viewOnlyMode: bool,

  // Optional
  timeStamp?: Date,
};

type State = {
  shouldDisplayControls: bool,
};


@Autobind
export default class Content extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {shouldDisplayControls: false};
  }

  render() {
    const viewerClasses = ClassNames({
      'cd-annotation-viewer': true,
      'hidden': this.props.pending || !this.props.shouldDisplayViewer,   //Hide if we are NOT pending and we SHOULD NOT display
    });

    const contentClasses = ClassNames({
      'cd-annotation-content': true,
    });

    const controlClasses = ClassNames({
      'cd-annotation-content-controls': true,
      'fade-in': this.state.shouldDisplayControls,
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

    return (
      <div style={divStyle} className={viewerClasses}>
        <div style={shadowStyle} className={shadowClasses}></div>
        <div className={contentClasses} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <div className={controlClasses}>
            <button className='delete' onClick={this.handleDeleteClick} hidden={!this.props.allowDelete}><i className='fa fa-fw fa-times'></i> Delete</button>
            <button className='edit' onClick={this.handleEditClick} hidden={!this.props.allowEdit}><i className='fa fa-fw fa-pencil'></i> Edit</button>
          </div>
          <div className='cd-annotation-content-text'>
            {this.props.content}
          </div>
          <div className='cd-annotation-content-info'>
            Comment #{this.props.id} by {this.props.author} <TimeAgo date={this.props.timeStamp} />
          </div>
        </div>
      </div>
    );
  }

  //
  // Custom Methods
  //

  handleEditClick(e: SyntheticInputEvent<*>) {
    e.stopPropagation();
    if (this.props.viewOnlyMode) return;

    this.props.editAnnotation(this.props.id);
  }

  handleDeleteClick(e: SyntheticInputEvent<*>) {
    e.stopPropagation();
    if (this.props.viewOnlyMode) return;

    this.props.deleteAnnotation(this.props.id);
  }

  // These allow event propogation because parent needs mouse events
  handleMouseOver(e: SyntheticInputEvent<*>) {
    if (this.props.viewOnlyMode) return;

    this.setState({shouldDisplayControls: true});
  }

  handleMouseOut(e: SyntheticInputEvent<*>) {
    this.setState({shouldDisplayControls: false});
  }
}
