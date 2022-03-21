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
import {ProgressBar} from '../';
import React, {CSSProperties} from 'react';

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

const grayedBoxStyle: CSSProperties = {
  width: '250px',
  height: '60px',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default {
  title: 'Progress/ProgressBar',
  decorators: [withKnobs],
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  }
};

export const Default = () => render();
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
      'aria-label': 'Loading…',
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

export const LongLabel = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      value,
      label: 'Super long progress bar label. Sample label copy. Loading...'
    });
  },
  name: 'long label'
};

export const LongLabelLabelPositionSide = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      value,
      labelPosition: 'side',
      label: 'Super long progress bar label. Sample label copy. Loading...'
    });
  },
  name: 'long label, labelPosition: side'
};

export const IsIndeterminateTrue = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return render({
      isIndeterminate: true,
      value
    });
  },
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

export const VariantOverBackground = {
  render: () => {
    const value = number('Value', 32, sliderOptions);
    return (
      <div style={grayedBoxStyle}>
        {render({
          variant: 'overBackground',
          value
        })}
      </div>
    );
  },
  name: 'variant: overBackground'
};

export const ParentWidth100 = {
  render: () => (
    <span
      style={{
        width: '100%'
      }}>
      {render()}
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
      {render()}
    </span>
  ),
  name: 'parent width 100px'
};

export const Width300Px = {
  render: () =>
    render({
      width: '300px',
      value: 100
    }),
  name: 'width: 300px'
};

export const Width300PxIsIndeterminateTrue = {
  render: () =>
    render({
      width: '300px',
      isIndeterminate: true
    }),
  name: 'width: 300px, isIndeterminate: true'
};

export const Width300PxLabelPositionSide = {
  render: () =>
    render({
      width: '300px',
      labelPosition: 'side'
    }),
  name: 'width: 300px, labelPosition: side'
};

export const Width300PxLabelPositionSideIsIndeterminateTrue = {
  render: () =>
    render({
      width: '300px',
      labelPosition: 'side',
      isIndeterminate: true
    }),
  name: 'width: 300px, labelPosition: side, isIndeterminate: true'
};

export const Width30Px = {
  render: () =>
    render({
      width: '30px'
    }),
  name: 'width: 30px'
};

export const Width30PxSizeS = {
  render: () =>
    render({
      width: '30px',
      size: 'S'
    }),
  name: 'width: 30px, size: S'
};

export const Width30PxLabelPositionSideLongLabel = {
  render: () =>
    render({
      width: '30px',
      labelPosition: 'side',
      label: 'Super long progress bar label. Sample label copy. Loading...'
    }),
  name: 'width: 30px, labelPosition: side, long label'
};

export const Width30PxLabelPositionSideIsIndeterminateTrueLongLabelButtonOnRight = {
  render: () => (
    <>
      {render({
        width: '30px',
        labelPosition: 'side',
        isIndeterminate: true,
        label: 'Super long progress bar label. Sample label copy. Loading...'
      })}
      <button>Confirm</button>
    </>
  ),
  name: 'width: 30px, labelPosition: side, isIndeterminate: true, long label, button on right'
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
  return <ProgressBar label="Loading…" {...props} />;
}
