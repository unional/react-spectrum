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
import {Checkbox} from '../';
import React from 'react';

export default {
  title: 'Checkbox',
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  },
  render: (props) => (
    <Checkbox {...props}>
      Checkbox Label
    </Checkbox>
  ),
  argTypes: {onChange: {action: 'change'}}
};

export const Default = {
  name: 'default'
};

export const DefaultSelectedTrue = {
  name: 'defaultSelected: true',
  args: {defaultSelected: true}
};

export const IsSelectedTrue = {
  name: 'isSelected: true',
  args: {isSelected: true}
};

export const IsSelectedFalse = {
  name: 'isSelected: false',
  args: {isSelected: false}
};

export const IsIndeterminateTrue = {
  name: 'isIndeterminate: true',
  args: {isIndeterminate: true}
};

export const ValidationStateInvalid = {
  name: 'validationState: "invalid"',
  args: {validationState: 'invalid'}
};

export const IsDisabledTrue = {
  name: 'isDisabled: true',
  args: {isDisabled: true}
};

export const isReadOnlyTrue = {
  name: 'isReadOnlyTrue: true',
  args: {isReadOnlyTrue: true}
};


export const IsEmphasizedTrue = {
  name: 'isEmphasized: true',
  args: {isEmphasized: true}
};

export const IsEmphasizedTrueIsIndeterminateTrue = {
  ...IsEmphasizedTrue,
  ...IsIndeterminateTrue,
  name: 'isEmphasized: true, isIndeterminate: true'
};

export const IsEmphasizedTrueValidationStateInvalid = {
  ...IsEmphasizedTrue,
  ...ValidationStateInvalid,
  name: 'isEmphasized: true, validationState: "invalid"'
};

export const IsEmphasizedTrueValidationStateInvalidIsIndeterminateTrue = {
  ...IsEmphasizedTrue,
  ...ValidationStateInvalid,
  ...IsIndeterminateTrue,
  name: 'isEmphasized: true, validationState: "invalid", isIndeterminate: true'
};

export const IsEmphasizedTrueIsDisabledTrue = {
  ...IsEmphasizedTrue,
  ...IsDisabledTrue,
  name: 'isEmphasized: true, isDisabled: true'
};

export const IsReadOnlyTrueIsSelectedTrue = {
  ...isReadOnlyTrue,
  ...IsSelectedTrue,
  name: 'isReadOnly: true, isSelected: true'
};

export const AutoFocusTrue = {
  name: 'autoFocus: true',
  args: {autoFocus: true}
};

export const CustomLabel = {
  render: (props) => (
    <Checkbox {...props}>
      <span>
        <i>Italicized</i> Checkbox Label
      </span>
    </Checkbox>
  ),
  name: 'custom label'
};

export const LongLabel = {
  render: (props) => (
    <Checkbox {...props}>
      Super long checkbox label. Sample text. Arma virumque cano, Troiae qui primus ab oris.
      Italiam, fato profugus, Laviniaque venit.
    </Checkbox>
  ),
  name: 'long label'
};

export const NoLabel = {
  name: 'no label',
  args: {'aria-label': 'This checkbox has no visible label'}
};
