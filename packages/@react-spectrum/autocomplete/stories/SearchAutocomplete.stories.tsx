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
import {Flex} from '@react-spectrum/layout';
import {Item, SearchAutocomplete} from '@react-spectrum/autocomplete';
import {mergeProps} from '@react-aria/utils';
import React from 'react';

let options = [
  {
    id: 1,
    name: 'Aerospace'
  },
  {
    id: 2,
    name: 'Mechanical'
  },
  {
    id: 3,
    name: 'Civil'
  },
  {
    id: 4,
    name: 'Biomedical'
  },
  {
    id: 5,
    name: 'Nuclear'
  },
  {
    id: 6,
    name: 'Industrial'
  },
  {
    id: 7,
    name: 'Chemical'
  },
  {
    id: 8,
    name: 'Agricultural'
  },
  {
    id: 9,
    name: 'Electrical'
  }
];

let actions = {
  onOpenChange: {action: 'onOpenChange'},
  onInputChange: {action: 'onInputChange'},
  onBlur: {action: 'onBlur'},
  onFocus: {action: 'onFocus'},
  onChange: {action: 'onChange'},
  onSubmit: {action: 'onSubmit'}
};

export default {
  title: 'SearchAutocomplete',
  component: SearchAutocomplete,
  render: (props) => (
    <SearchAutocomplete label="Search with Autocomplete" {...props}>
      <Item>Aerospace</Item>
      <Item>Mechanical</Item>
      <Item>Civil</Item>
      <Item>Biomedical</Item>
      <Item>Nuclear</Item>
      <Item>Industrial</Item>
      <Item>Chemical</Item>
      <Item>Agricultural</Item>
      <Item>Electrical</Item>
    </SearchAutocomplete>
  ),
  argTypes: {...actions}
};

function CustomOnSubmit(props) {
  let [searchTerm, setSearchTerm] = React.useState('');

  let onSubmit = (value, key) => {
    if (value) {
      setSearchTerm(value);
    } else if (key) {
      setSearchTerm(options.find((o) => o.id === key).name);
    }
  };

  return (
    <Flex direction="column">
      <SearchAutocomplete
        defaultItems={options}
        label="Search with Autocomplete"
        {...mergeProps(props, {onSubmit})}>
        {(item: any) => <Item>{item.name}</Item>}
      </SearchAutocomplete>
      <div>Search results for: {searchTerm}</div>
    </Flex>
  );
}

export const Static = {
  name: 'static items'
};

export const DynamicItems = {
  render: (props) => (
    <SearchAutocomplete
      defaultItems={options}
      label="Search with Autocomplete"
      {...props}>
      {(item: any) => <Item>{item.name}</Item>}
    </SearchAutocomplete>
  ),
  name: 'dynamic items'
};

export const NoItems = {
  ...DynamicItems,
  name: 'no items',
  args: {defaultItems: []}
};

export const MappedItems = {
  render: (props) => (
    <SearchAutocomplete label="Search with Autocomplete" {...props}>
      {options.map((item) => (
        <Item key={item.id}>{item.name}</Item>
      ))}
    </SearchAutocomplete>
  ),
  name: 'with mapped items'
};

export const MenuTriggerFocus = {
  name: 'menuTrigger: focus',
  arg: {menuTrigger: 'focus'}
};

export const MenuTriggerManual = {
  name: 'menuTrigger: manual',
  arg: {menuTrigger: 'manual'}
};

export const isQuiet = {
  name: 'isQuiet',
  args: {isQuiet: true}
};

export const isDisabled = {
  name: 'isDisabled',
  args: {isDisabled: true}
};

export const isReadOnly = {
  name: 'isReadOnly',
  args: {isReadOnly: true, inputValue: 'Read only'}
};

export const labelAlignEnd = {
  name: 'labelPosition: top, labelAlign: end',
  args: {labelAlign: 'end'}
};

export const labelPositionSide = {
  name: 'labelPosition: side',
  args: {labelPosition: 'side'}
};

export const noVisibleLabel = {
  name: 'No visible label',
  args: {label: undefined, 'aria-label': 'Search Autocomplete'}
};

export const noVisibleLabelIsQuiet = {
  ...noVisibleLabel,
  ...isQuiet,
  name: 'No visible label, isQuiet'
};

export const isRequired = {
  name: 'isRequired',
  args: {isRequired: true}
};

export const isRequiredNecessityIndicatorLabel = {
  ...isRequired,
  name: 'isRequired, necessityIndicator: label',
  args: {necessityIndicator: 'label'}
};

export const validationStateInvalid = {
  name: 'validationState: invalid',
  args: {validationState: 'invalid'}
};

export const validationStateValid = {
  name: 'validationState: valid',
  args: {validationState: 'invalid'}
};

export const validationStateInvalidIsQuiet = {
  ...validationStateInvalid,
  ...isQuiet,
  name: 'validationState: invalid, isQuiet'
};

export const validationStateValidIsQuiet = {
  ...validationStateValid,
  ...isQuiet,
  name: 'validationState: valid, isQuiet'
};

export const placeholder = {
  name: 'placeholder',
  args: {placeholder: 'Search for an item...'}
};

export const autoFocus = {
  name: 'autoFocus: true',
  args: {autoFocus: true}
};

export const directionTop = {
  name: 'direction: top',
  args: {direction: 'top'}
};

export const customWidth500 = {
  name: 'custom width: size-500',
  args: {width: 'size-500'}
};

export const customWidth3000 = {
  name: 'custom width: size-3000',
  args: {width: 'size-3000'}
};

export const customWidth6000 = {
  name: 'custom width: size-6000',
  args: {width: 'size-6000'}
};

export const customOnSubmit = {
  name: 'custom onSubmit',
  render: (props) => <CustomOnSubmit {...props} />
};
