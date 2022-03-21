/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import TimeFieldStories from './TimeField.stories';

export default {
  ...TimeFieldStories,
  title: 'Date and Time/TimeField/styling'
};

export const IsQuiet = {
  name: 'isQuiet',
  args: {isQuiet: true}
};

export const LabelPositionSide = {
  name: 'labelPosition: side',
  args: {labelPosition: 'side'}
};

export const LabelAlignEnd = {
  name: 'labelAlign: end',
  args: {
    labelPosition: 'top',
    labelAlign: 'end'
  }
};

export const Required = {
  name: 'required',
  args: {isRequired: true}
};

export const RequiredWithLabel = {
  name: 'required with label',
  args: {
    isRequired: true,
    necessityIndicator: 'label'
  }
};

export const Optional = {
  name: 'optional',
  args: {necessityIndicator: 'label'}
};

export const NoVisibleLabel = {
  name: 'no visible label',
  args: {
    'aria-label': 'Time',
    label: null
  }
};

export const QuietNoVisibleLabel = {
  name: 'quiet no visible label',
  args: {
    isQuiet: true,
    'aria-label': 'Time',
    label: null
  }
};

export const CustomWidth = {
  name: 'custom width',
  args: {width: 'size-3000'}
};

export const QuietCustomWidth = {
  name: 'quiet custom width',
  args: {
    isQuiet: true,
    width: 'size-3000'
  }
};

export const CustomWidthNoVisibleLabel = {
  name: 'custom width no visible label',
  args: {
    width: 'size-3000',
    label: null,
    'aria-label': 'Time'
  }
};

export const CustomWidthLabelPositionSide = {
  name: 'custom width, labelPosition=side',
  args: {
    width: 'size-3000',
    labelPosition: 'side'
  }
};
