// carbondream - Copyright 2021 Zeroarc Software, LLC
// Input dialog for annotation
'use strict';

import ClassNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import type { Offset } from './types';

type Props = {
  cancelAnnotation: () => void,
  content: string,
  invert: boolean,
  offset: Offset,
  pending: boolean,
  pullHorizontal: boolean,
  pushHorizontal: boolean,
  saveAnnotation: (value: string) => void,
};

export const Input = (props: Props) => {
  const [value, setValue] = useState(props.content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    setValue(e.target.value);
  };

  const handleSaveClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    props.saveAnnotation(value);
  };

  const handleCancelClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    props.cancelAnnotation();
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();

    // If the textarea blurs with no input, the user has clicked or tabbed out. Cancel.
    if (value.length === 0) props.cancelAnnotation();
  };

  const editorClasses = ClassNames({
    'cd-annotation-editor': true,
    'hidden': !props.pending,
  });

  const inputClasses = ClassNames({
    'cd-annotation-input': true,
  });

  const shadowClasses = ClassNames({
    'cd-shadow-bubble': true,
    'invert': props.invert,
  });

  // Apply offsets for outer div
  const divStyle = {
    left: props.offset.horizontal,
    top: props.offset.vertical,
  };

  // Apply offsets for shadow bubble. Trial and error to figure
  // out the maximums
  let shadowStyle: { left?: number } = {};
  if (props.pushHorizontal || props.pullHorizontal) {
    shadowStyle.left = props.offset.shadow || -props.offset.horizontal - 4;

    if (shadowStyle.left < 6)
      shadowStyle.left = 6;
    else if (shadowStyle.left > 234)
      shadowStyle.left = 234;
  }

  const saveClasses = ClassNames('btn btn-sm btn-outline-primary', {
    disabled: !value.length
  });

  const cancelClasses = ClassNames('btn btn-sm btn-outline-danger');

  return (
    <div style={divStyle} className={editorClasses}>
      <div style={shadowStyle} className={shadowClasses}></div>
      <div className={inputClasses}>
        <textarea autoFocus
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className='cd-annotation-input-controls'>
          <button className={cancelClasses} onClick={handleCancelClick}>
            <FontAwesomeIcon icon={['far', 'times']} /> Cancel
          </button>
          <button className={saveClasses} onClick={handleSaveClick}>
            <FontAwesomeIcon icon={['far', 'check']} /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;