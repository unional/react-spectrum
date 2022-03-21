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
import {action} from '@storybook/addon-actions';
import {ErrorBoundary} from '@react-spectrum/story-utils';
import {RangeSlider} from '../';
import React from 'react';
import {SpectrumRangeSliderProps} from '@react-types/slider';

let message = 'Your browser may not support this set of format options.';

export default {
  title: 'Slider/RangeSlider',
  decorators: [(story) => <ErrorBoundary message={message}>{story()}</ErrorBoundary>]
};

export const Default = () =>
  render({
    'aria-label': 'Label'
  });
export const Label = {
  render: () =>
    render({
      label: 'Label'
    }),
  name: 'label'
};

export const IsDisabled = {
  render: () =>
    render({
      label: 'Label',
      defaultValue: {
        start: 30,
        end: 70
      },
      isDisabled: true
    }),
  name: 'isDisabled'
};

export const CustomWidth = {
  render: () =>
    render({
      label: 'Label',
      width: '300px'
    }),
  name: 'custom width'
};

export const LabelOverflow = {
  render: () =>
    render({
      label: 'This is a rather long label for this narrow slider element.',
      maxValue: 1000,
      width: '300px'
    }),
  name: 'label overflow'
};

export const ShowValueLabelFalse = {
  render: () =>
    render({
      label: 'Label',
      showValueLabel: false
    }),
  name: 'showValueLabel: false'
};

export const FormatOptionsPercent = {
  render: () =>
    render({
      label: 'Label',
      minValue: 0,
      maxValue: 1,
      step: 0.01,
      formatOptions: {
        style: 'percent'
      }
    }),
  name: 'formatOptions percent'
};

export const FormatOptionsCentimeter = {
  render: () =>
    // @ts-ignore TODO why is "unit" even missing? How well is it supported?
    render({
      label: 'Label',
      maxValue: 1000,
      formatOptions: {
        style: 'unit',
        unit: 'centimeter'
      }
    }),
  name: 'formatOptions centimeter'
};

export const CustomValueLabel = {
  render: () =>
    render({
      label: 'Label',
      getValueLabel: (value) => `${value.start} <-> ${value.end}`
    }),
  name: 'custom valueLabel'
};

export const CustomValueLabelWithLabelOverflow = {
  render: () =>
    render({
      label: 'This is a rather long label for this narrow slider element.',
      getValueLabel: (value) => `${value.start} <-> ${value.end}`
    }),
  name: 'custom valueLabel with label overflow'
};

export const LabelPositionSide = {
  render: () =>
    render({
      label: 'Label',
      labelPosition: 'side'
    }),
  name: 'labelPosition: side'
};

export const MinMax = {
  render: () =>
    render({
      label: 'Label',
      minValue: 30,
      maxValue: 70
    }),
  name: 'min/max'
};

function render(props: SpectrumRangeSliderProps = {}) {
  if (props.onChange == null) {
    props.onChange = (v) => {
      action('change')(v.start, v.end);
    };
  }

  return <RangeSlider {...props} />;
}
