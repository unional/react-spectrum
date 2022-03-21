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
import {Meter} from '../';
import {number, withKnobs} from '@storybook/addon-knobs';
import React from 'react';

const sliderOptions = {
  range: true,
  min: 0,
  max: 100,
  step: 1
};

const formatOptions = {
  style: 'currency',
  currency: 'JPY'
};

export default {
  title: 'Meter',
  decorators: [withKnobs],
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  }
};

export const Value50 = {
  render: () =>
    render({
      value: 50
    }),
  name: 'value: 50'
};

export const Value100 = {
  render: () =>
    render({
      value: 100
    }),
  name: 'value: 100'
};

export const SizeS = {
  render: () => {
    const value = number('Value', 50, sliderOptions);
    return render({
      value,
      size: 'S'
    });
  },
  name: 'size: S'
};

export const ShowValueLabelTrue = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      showValueLabel: true,
      value
    });
  },
  name: 'showValueLabel: true'
};

export const ShowValueLabelFalse = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      showValueLabel: false,
      value
    });
  },
  name: 'showValueLabel: false'
};

export const ValueLabel1Of4 = {
  render: () =>
    render({
      value: 25,
      valueLabel: '1 of 4'
    }),
  name: 'valueLabel: 1 of 4'
};

export const UsingNumberFormatOptionsWithCurrencyStyle = {
  render: () => {
    const value = number('Value', 60, sliderOptions);
    return render({
      showValueLabel: true,
      value,
      formatOptions
    });
  },
  name: 'Using number formatOptions with currency style'
};

export const NoVisibleLabel = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      label: null,
      'aria-label': 'Meter',
      value
    });
  },
  name: 'no visible label'
};

export const LabelPositionSide = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      value,
      labelPosition: 'side'
    });
  },
  name: 'labelPosition: side'
};

export const LabelPositionTop = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      value,
      labelPosition: 'top'
    });
  },
  name: 'labelPosition: top'
};

export const VariantPositive = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      variant: 'positive',
      value
    });
  },
  name: 'variant: positive'
};

export const VariantCritical = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      variant: 'critical',
      value
    });
  },
  name: 'variant: critical'
};

export const VariantWarning = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      variant: 'warning',
      value
    });
  },
  name: 'variant: warning'
};

export const ParentWidth100 = {
  render: () => (
    <span
      style={{
        width: '100%'
      }}>
      {render({
        value: 32
      })}
    </span>
  ),
  name: 'parent width 100%'
};

export const ParentWidth100Px = {
  render: () => (
    <span
      style={{
        width: '100px'
      }}>
      {render({
        value: 32
      })}
    </span>
  ),
  name: 'parent width 100px'
};

export const Width300Px = {
  render: () =>
    render({
      value: 32,
      width: '300px'
    }),
  name: 'width: 300px'
};

export const Width300PxLabelPositionSide = {
  render: () =>
    render({
      value: 32,
      width: '300px',
      labelPosition: 'side'
    }),
  name: 'width: 300px, labelPosition: side'
};

export const Width30Px = {
  render: () =>
    render({
      value: 32,
      width: '30px'
    }),
  name: 'width: 30px'
};

export const Width30PxLabelPositionSide = {
  render: () =>
    render({
      value: 32,
      width: '30px',
      labelPosition: 'side'
    }),
  name: 'width: 30px, labelPosition: side'
};

export const UsingRawValuesForMinValueMaxValueAndValue = {
  render: () =>
    render({
      showValueLabel: true,
      labelPosition: 'top',
      maxValue: 2147483648,
      value: 715827883
    }),
  name: 'Using raw values for minValue, maxValue, and value'
};

export const UsingRawValuesWithNumberFormatter = {
  render: () =>
    render({
      showValueLabel: true,
      labelPosition: 'top',
      maxValue: 2147483648,
      value: 715827883,
      formatOptions
    }),
  name: 'Using raw values with number formatter'
};

function render(props: any = {}) {
  return <Meter label="Meter" variant="positive" {...props} />;
}
