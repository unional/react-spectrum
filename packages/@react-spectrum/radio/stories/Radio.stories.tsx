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
import {Provider} from '@react-spectrum/provider';
import {Radio, RadioGroup} from '../src';
import React from 'react';

export default {
  title: 'RadioGroup',
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  }
};

export const Default = {
  render: () => render({}),
  name: 'default'
};

export const DefaultValueDragons = {
  render: () =>
    render({
      defaultValue: 'dragons'
    }),
  name: 'defaultValue: dragons'
};

export const ControlledDragons = {
  render: () =>
    render({
      value: 'dragons'
    }),
  name: 'controlled: dragons'
};

export const LabelPositionSide = {
  render: () =>
    render({
      labelPosition: 'side'
    }),
  name: 'labelPosition: side'
};

export const LabelAlignEnd = {
  render: () =>
    render({
      labelAlign: 'end'
    }),
  name: 'labelAlign: end'
};

export const Horizontal = {
  render: () =>
    render({
      orientation: 'horizontal'
    }),
  name: 'horizontal'
};

export const HorizontalLabelPositionSide = {
  render: () =>
    render({
      orientation: 'horizontal',
      labelPosition: 'side'
    }),
  name: 'horizontal, labelPosition: side'
};

export const HorizontalLabelAlignEnd = {
  render: () =>
    render({
      orientation: 'horizontal',
      labelAlign: 'end'
    }),
  name: 'horizontal, labelAlign: end'
};

export const IsDisabled = {
  render: () =>
    render({
      isDisabled: true
    }),
  name: 'isDisabled'
};

export const IsDisabledOnOneRadio = {
  render: () =>
    render({}, [
      {},
      {
        isDisabled: true
      },
      {}
    ]),
  name: 'isDisabled on one radio'
};

export const IsDisabledOnOneRadioHorizontal = {
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
  name: 'isDisabled on one radio horizontal'
};

export const IsRequired = {
  render: () =>
    render({
      isRequired: true
    }),
  name: 'isRequired'
};

export const IsRequiredNecessityIndicatorLabel = {
  render: () =>
    render({
      isRequired: true,
      necessityIndicator: 'label'
    }),
  name: 'isRequired, necessityIndicator: label'
};

export const NecessityIndicatorLabelLabelPositionSide = {
  render: () =>
    render({
      necessityIndicator: 'label',
      labelPosition: 'side'
    }),
  name: 'necessityIndicator: label, labelPosition: side'
};

export const IsReadOnly = {
  render: () =>
    render({
      isReadOnly: true
    }),
  name: 'isReadOnly'
};

export const IsEmphasized = {
  render: () =>
    render({
      isEmphasized: true
    }),
  name: 'isEmphasized'
};

export const ValidationStateInvalid = {
  render: () =>
    render({
      validationState: 'invalid'
    }),
  name: 'validationState: "invalid"'
};

export const NoVisibleLabel = {
  render: () =>
    render({
      label: null,
      'aria-label': 'Favorite pet'
    }),
  name: 'no visible label'
};

export const LongRadioLabel = {
  render: () => renderLongLabel({}),
  name: 'long radio label'
};

export const ProviderControlIsDisabled = {
  render: () => renderFormControl(),
  name: 'provider control: isDisabled'
};

export const AutoFocusOnOneRadio = {
  render: () =>
    render({}, [
      {},
      {
        autoFocus: true
      },
      {}
    ]),
  name: 'autoFocus on one radio'
};

function render(props, radioProps = [{}, {}, {}]) {
  return (
    <RadioGroup
      label="Favorite pet"
      {...props}
      onChange={action('onChange')}
      name="favorite-pet-group">
      <Radio value="dogs" {...radioProps[0]}>
        Dogs
      </Radio>
      <Radio value="cats" {...radioProps[1]}>
        Cats
      </Radio>
      <Radio value="dragons" {...radioProps[2]}>
        Dragons
      </Radio>
    </RadioGroup>
  );
}

function renderLongLabel(props, radioProps = [{}, {}, {}]) {
  return (
    <RadioGroup aria-label="Favorite pet" {...props} onChange={action('onChange')}>
      <Radio value="dogs" {...radioProps[0]}>
        Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs Dogs
        Dogs Dogs Dogs Dogs Dogs
      </Radio>
      <Radio value="cats" {...radioProps[1]}>
        Cats
      </Radio>
      <Radio value="dragons" {...radioProps[2]}>
        Dragons
      </Radio>
    </RadioGroup>
  );
}

function renderFormControl() {
  return (
    <Provider isDisabled>
      <RadioGroup
        aria-label="Favorite pet"
        onChange={action('onChangePet')}
        name="favorite-pet-group">
        <Radio value="dogs">Dogs</Radio>
        <Radio value="cats">Cats</Radio>
        <Radio value="dragons">Dragons</Radio>
      </RadioGroup>
      <RadioGroup
        aria-label="Favorite cereal"
        onChange={action('onChangeCereal')}
        name="favorite-cereal-group">
        <Radio value="reeses">Reese's Peanut Butter Puffs</Radio>
        <Radio value="honeynut">HoneyNut Cheerios</Radio>
        <Radio value="cinnamon">Cinnamon Toast Crunch</Radio>
      </RadioGroup>
    </Provider>
  );
}
