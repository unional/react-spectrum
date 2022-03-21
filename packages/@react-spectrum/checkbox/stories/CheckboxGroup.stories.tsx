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
import {Checkbox, CheckboxGroup} from '../';
import React from 'react';
import {SpectrumCheckboxGroupProps} from '@react-types/checkbox';

export default {
  title: 'CheckboxGroup',
  render: (props) => (
    <CheckboxGroup label="Pets" {...props}>
      <Checkbox value="dogs" {...checkboxProps[0]}>
        Dogs
      </Checkbox>
      <Checkbox value="cats" {...checkboxProps[1]}>
        Cats
      </Checkbox>
      <Checkbox value="dragons" {...checkboxProps[2]}>
        Dragons
      </Checkbox>
    </CheckboxGroup>
  ),
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  },
  argTypes: {onAction: {action: 'onAction'}}
};

export const Default = {
  name: 'default'
};

export const DefaultValueDragons = {
  name: 'defaultValue: dragons',
  args: {defaultValue: ['dragons']}
};

export const ControlledDragons = {
  name: 'controlled: dragons',
  args: {value: ['dragons']}
};

export const LabelPositionSide = {
  name: 'labelPosition: side',
  args: {labelPosition: 'side'}
};

export const LabelAlignEnd = {
  name: 'labelAlign: end',
  args: {labelAlign: 'end'}
};

export const Horizontal = {
  name: 'horizontal',
  args: {orientation: 'horizontal'}
};

export const HorizontalLabelPositionSide = {
  ...Horizontal,
  ...LabelPositionSide,
  name: 'horizontal, labelPosition: side'
};

export const HorizontalLabelAlignEnd = {
  ...Horizontal,
  ...LabelAlignEnd,
  name: 'horizontal, labelAlign: end'
};

export const IsDisabled = {
  name: 'isDisabled',
  args: {isDisabled: true}
};

export const IsDisabledOnOneCheckbox = {
  render: () =>
    render({}, [
      {},
      {
        isDisabled: true
      },
      {}
    ]),
  name: 'isDisabled on one checkbox'
};

export const IsDisabledOnOneCheckboxHorizontal = {
  render: () =>
    render(
      {
        orientation: 'horizontal'
      },
      [
        {},
        {
          isDisabled: true
        },
        {}
      ]
    ),
  name: 'isDisabled on one checkbox horizontal'
};

export const IsRequired = {
  name: 'isRequired',
  args: {isRequired: true}
};

export const IsRequiredNecessityIndicatorLabel = {
  ...IsRequired,
  name: 'isRequired, necessityIndicator: label',
  args: {necessityIndicator: 'label'}
};

export const NecessityIndicatorLabelLabelPositionSide = {
  ...LabelPositionSide,
  name: 'necessityIndicator: label, labelPosition: side',
  args: {necessityIndicator: 'label'}
};

export const IsReadOnly = {
  name: 'isReadOnly',
  args: {isReadOnly: true}
};

export const IsEmphasized = {
  name: 'isEmphasized',
  args: {isEmphasized: true}
};

export const ValidationStateInvalid = {
  name: 'validationState: "invalid"',
  args: {validationState: 'invalid'}
};

export const ValidationStateInvalidOnOneCheckbox = {
  render: () =>
    render({}, [
      {},
      {
        validationState: 'invalid'
      },
      {}
    ]),
  name: 'validationState: "invalid" on one checkbox'
};

export const NoVisibleLabel = {
  name: 'no visible label',
  args: {
    label: null,
    'aria-label': 'Pets'
  }
};

export const AutoFocusOnOneCheckbox = {
  render: () =>
    render({}, [
      {},
      {
        autoFocus: true
      },
      {}
    ]),
  name: 'autoFocus on one checkbox'
};

export const FormName = {
  name: 'form name',
  args: {name: 'pets'}
};

function render(
  props: Omit<SpectrumCheckboxGroupProps, 'children'> = {},
  checkboxProps: any[] = []
) {
  return (
    <CheckboxGroup label="Pets" {...props} onChange={action('onChange')}>
      <Checkbox value="dogs" {...checkboxProps[0]}>
        Dogs
      </Checkbox>
      <Checkbox value="cats" {...checkboxProps[1]}>
        Cats
      </Checkbox>
      <Checkbox value="dragons" {...checkboxProps[2]}>
        Dragons
      </Checkbox>
    </CheckboxGroup>
  );
}
