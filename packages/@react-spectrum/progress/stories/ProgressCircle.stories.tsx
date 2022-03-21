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
import {number, withKnobs} from '@storybook/addon-knobs';
import {ProgressCircle} from '../';
import React, {CSSProperties} from 'react';

const sliderOptions = {
  range: true,
  min: 0,
  max: 100,
  step: 1
};

const grayedBoxStyle: CSSProperties = {
  width: '100px',
  height: '100px',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default {
  title: 'Progress/ProgressCircle',
  decorators: [withKnobs],
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  }
};

export const Default = () => render();
export const Value50 = {
  render: () => {
    const value = number('Value', 50, sliderOptions);
    return render({
      value
    });
  },
  name: 'value: 50'
};

export const Value100 = {
  render: () => {
    const value = number('Value', 100, sliderOptions);
    return render({
      value
    });
  },
  name: 'value: 100'
};

export const SizeS = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      value,
      size: 'S'
    });
  },
  name: 'size: S'
};

export const SizeL = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      value,
      size: 'L'
    });
  },
  name: 'size: L'
};

export const VariantOverBackground = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return (
      <div style={grayedBoxStyle}>
        {render({
          value,
          variant: 'overBackground'
        })}
      </div>
    );
  },
  name: 'variant: overBackground'
};

export const UsingRawValuesForMinValueMaxValueAndValue = {
  render: () =>
    render({
      labelPosition: 'top',
      maxValue: 2147483648,
      value: 715827883
    }),
  name: 'Using raw values for minValue, maxValue, and value'
};

export const IsIndeterminateTrue = {
  render: () =>
    render({
      isIndeterminate: true
    }),
  name: 'isIndeterminate: true'
};

export const IsIndeterminateTrueSizeS = {
  render: () =>
    render({
      isIndeterminate: true,
      size: 'S'
    }),
  name: 'isIndeterminate: true, size: S'
};

export const IsIndeterminateTrueSizeL = {
  render: () =>
    render({
      isIndeterminate: true,
      size: 'L'
    }),
  name: 'isIndeterminate: true, size: L'
};

export const IsIndeterminateTrueVariantOverBackground = {
  render: () => (
    <div style={grayedBoxStyle}>
      {render({
        isIndeterminate: true,
        variant: 'overBackground'
      })}
    </div>
  ),
  name: 'isIndeterminate: true, variant: overBackground'
};

function render(props = {}) {
  return <ProgressCircle aria-label="Loading…" {...props} />;
}
