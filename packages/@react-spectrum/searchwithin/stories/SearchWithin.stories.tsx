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
import {ActionButton} from '@react-spectrum/button';
import {Flex} from '@react-spectrum/layout';
import {Item, Picker} from '@react-spectrum/picker';
import React, {useState} from 'react';
import {SearchField} from '@react-spectrum/searchfield';
import {SearchFieldProps} from '@react-types/searchfield';
import {SearchWithin} from '../';
import {SpectrumPickerProps} from '@react-types/select';
import {SpectrumSearchWithinProps} from '@react-types/searchwithin';

export default {
  title: 'SearchWithin'
};

function render(
  props: Omit<SpectrumSearchWithinProps, 'children'> = {},
  searchFieldProps: SearchFieldProps = {},
  pickerProps: Omit<SpectrumPickerProps<object>, 'children'> = {}
) {
  return (
    <SearchWithin label="Search" {...props}>
      <SearchField
        placeholder="Search"
        {...searchFieldProps}
        onChange={action('change')}
        onSubmit={action('submit')} />
      <Picker
        defaultSelectedKey="all"
        {...pickerProps}
        onSelectionChange={action('selectionChange')}>
        <Item key="all">All</Item>
        <Item key="campaigns">Campaigns</Item>
        <Item key="audiences">Audiences</Item>
        <Item key="tags">Tags</Item>
      </Picker>
    </SearchWithin>
  );
}

function renderReverse(
  props: Omit<SpectrumSearchWithinProps, 'children'> = {},
  searchFieldProps: SearchFieldProps = {},
  pickerProps: Omit<SpectrumPickerProps<object>, 'children'> = {}
) {
  return (
    <SearchWithin label="Search" {...props}>
      <Picker
        defaultSelectedKey="all"
        {...pickerProps}
        onSelectionChange={action('selectionChange')}>
        <Item key="all">All</Item>
        <Item key="campaigns">Campaigns</Item>
        <Item key="audiences">Audiences</Item>
        <Item key="tags">Tags</Item>
      </Picker>
      <SearchField
        placeholder="Search"
        {...searchFieldProps}
        onChange={action('change')}
        onSubmit={action('submit')} />
    </SearchWithin>
  );
}

function ResizeSearchWithinApp(props) {
  const [state, setState] = useState(true);
  return (
    <Flex direction="column" gap="size-200" alignItems="start">
      <div
        style={{
          width: state ? '300px' : '400px'
        }}>
        <SearchWithin label="Search" {...props} width="100%">
          <SearchField
            placeholder="Search"
            onChange={action('change')}
            onSubmit={action('submit')} />
          <Picker defaultSelectedKey="all" onSelectionChange={action('selectionChange')}>
            <Item key="all">All</Item>
            <Item key="campaigns">Campaigns</Item>
            <Item key="audiences">Audiences</Item>
            <Item key="tags">Tags</Item>
          </Picker>
        </SearchWithin>
      </div>
      <ActionButton onPress={() => setState(!state)}>Toggle size</ActionButton>
    </Flex>
  );
}

export const Default = () => render({});
export const ValueControlled = {
  render: () =>
    render(
      {},
      {
        value: 'Controlled'
      }
    ),
  name: 'value (controlled) '
};

export const isDisabled = {
  render: () =>
    render({
      isDisabled: true
    }),
  name: 'isDisabled: true'
};

export const isRequired = {
  render: () =>
    render({
      isRequired: true
    }),
  name: 'isRequired: true'
};

export const isReadOnly = {
  render: () =>
    render(
      {},
      {
        isReadOnly: true,
        value: 'Read Only'
      }
    ),
  name: 'isReadOnly: true'
};

export const searchfieldDefaultValue = {
  render: () =>
    render(
      {},
      {
        defaultValue: 'Default Value'
      }
    ),
  name: 'Default value for Searchfield'
};

export const pickerDefaultValue = {
  render: () =>
    render(
      {},
      {},
      {
        defaultSelectedKey: 'tags'
      }
    ),
  name: 'Default value for Picker'
};

export const isRequiredNecessityIndicatorLabel = {
  render: () =>
    render({
      isRequired: true,
      necessityIndicator: 'label'
    }),
  name: 'isRequired: true, necessityIndicator "label"'
};

export const isRequiredFalse_necessityIndicator = {
  render: () =>
    render({
      isRequired: false,
      necessityIndicator: 'label'
    }),
  name: 'isRequired: false, necessityIndicator "label"'
};

export const InputValidationSateInvalid = {
  render: () =>
    render(
      {},
      {
        validationState: 'invalid'
      }
    ),
  name: 'input validationState: invalid'
};

export const PickerValidationSateInvalid = {
  render: () =>
    render(
      {},
      {},
      {
        validationState: 'invalid'
      }
    ),
  name: 'picker validationState: invalid'
};

export const PickerDisabled = () =>
  render(
    {},
    {},
    {
      isDisabled: true
    }
  );
export const CustomWidth300 = {
  render: () =>
    render({
      width: 300
    }),
  name: 'Custom width: 300'
};

export const CustomWidth30 = {
  render: () =>
    render({
      width: 30
    }),
  name: 'Custom width: 30'
};

export const LabelPositionSide = {
  render: () =>
    render({
      labelPosition: 'side'
    }),
  name: 'labelPosition: side'
};

export const NoLabel = () =>
  render({
    label: undefined,
    'aria-label': 'Aria Label'
  });
export const AutoFocusSearchField = {
  render: () =>
    render(
      {},
      {
        autoFocus: true
      }
    ),
  name: 'autoFocus: true on SearchField'
};

export const AutoFocusPicker = {
  render: () =>
    render(
      {},
      {},
      {
        autoFocus: true
      }
    ),
  name: 'autoFocus: true on Picker'
};

export const ReverseChildrenOrder = () => renderReverse({});
export const ResizeSearchWithin = () => <ResizeSearchWithinApp />;
export const ResizeSearchWithinNoLabel = () => <ResizeSearchWithinApp label={null} />;
