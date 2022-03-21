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
import {ActionButton, Button} from '@react-spectrum/button';
import Add from '@spectrum-icons/workflow/Add';
import Alert from '@spectrum-icons/workflow/Alert';
import Bell from '@spectrum-icons/workflow/Bell';
import {ButtonGroup} from '@react-spectrum/buttongroup';
import {ComboBox, Item, Section} from '../';
import Copy from '@spectrum-icons/workflow/Copy';
import Draw from '@spectrum-icons/workflow/Draw';
import {Flex} from '@react-spectrum/layout';
import {mergeProps} from '@react-aria/utils';
import React, {useRef, useState} from 'react';
import {Text} from '@react-spectrum/text';
import {TextField} from '@react-spectrum/textfield';
import {useAsyncList} from '@react-stately/data';
import {useFilter} from '@react-aria/i18n';
import {useListData, useTreeData} from '@react-stately/data';

let items = [
  {
    name: 'Aardvark',
    id: '1'
  },
  {
    name: 'Kangaroo',
    id: '2'
  },
  {
    name: 'Snake',
    id: '3'
  }
];

let withSection = [
  {
    name: 'Animals',
    id: 's1',
    children: [
      {
        name: 'Aardvark',
        id: '1'
      },
      {
        name: 'Kangaroo',
        id: '2'
      },
      {
        name: 'Snake',
        id: '3'
      }
    ]
  },
  {
    name: 'People',
    id: 's2',
    children: [
      {
        name: 'Danni',
        id: '4'
      },
      {
        name: 'Devon',
        id: '5'
      },
      {
        name: 'Ross',
        id: '6'
      }
    ]
  }
];

let lotsOfSections: any[] = [];

for (let i = 0; i < 50; i++) {
  let children = [];

  for (let j = 0; j < 50; j++) {
    children.push({
      name: `Section ${i}, Item ${j}`
    });
  }

  lotsOfSections.push({
    name: 'Section ' + i,
    children
  });
}

let actions = {
  onOpenChange: {action: 'onOpenChange'},
  onInputChange: {action: 'onInputChange'},
  onSelectionChange: {action: 'onSelectionChange'},
  onBlur: {action: 'onBlur'},
  onFocus: {action: 'onFocus'}
};

export default {
  title: 'ComboBox',
  component: ComboBox,
  render: (props) => (
    <ComboBox label="Combobox" {...props}>
      <Item key="one">Item One</Item>
      <Item key="two" textValue="Item Two">
        <Copy size="S" />
        <Text>Item Two</Text>
      </Item>
      <Item key="three">Item Three</Item>
    </ComboBox>
  ),
  argTypes: {...actions}
};

export const StaticItems = {
  name: 'static items'
};

export const DynamicItems = {
  name: 'dynamic items',
  render: (props) => (
    <ComboBox defaultItems={items} label="Combobox" {...props}>
      {(item) => <Item>{item.name}</Item>}
    </ComboBox>
  )
};

export const NoItems = {
  name: 'no items',
  render: (props) => (
    <ComboBox defaultItems={[]} label="Combobox" {...props}>
      {(item: any) => <Item>{item.name}</Item>}
    </ComboBox>
  )
};

export const WithMappedItemsDefaultItemAndItemsUndef = {
  name: 'with mapped items (defaultItem and items undef)',
  render: (props) => <ComboBoxWithMap defaultSelectedKey="two" {...props} />
};

export const WithSections = {
  name: 'with sections',
  render: (props) => (
    <ComboBox defaultItems={withSection} label="Combobox" {...props}>
      {(item) => (
        <Section key={item.name} items={item.children} title={item.name}>
          {(item) => <Item key={item.name}>{item.name}</Item>}
        </Section>
      )}
    </ComboBox>
  )
};

export const WithManySections = {
  name: 'with many sections',
  render: (props) => (
    <ComboBox defaultItems={lotsOfSections} label="Combobox" {...props}>
      {(item) => (
        <Section key={item.name} items={item.children} title={item.name}>
          {(item: any) => <Item key={item.name}>{item.name}</Item>}
        </Section>
      )}
    </ComboBox>
  )
};

export const ComplexItems = {
  name: 'complex items',
  render: (props) => (
    <ComboBox label="Select action" {...props}>
      <Item textValue="Add to queue">
        <Add />
        <Text>Add to queue</Text>
        <Text slot="description">Add to current watch queue.</Text>
      </Item>
      <Item textValue="Add review">
        <Draw />
        <Text>Add review</Text>
        <Text slot="description">Post a review for the episode.</Text>
      </Item>
      <Item textValue="Subscribe to series">
        <Bell />
        <Text>Subscribe to series</Text>
        <Text slot="description">
          Add series to your subscription list and be notified when a new episode airs.
        </Text>
      </Item>
      <Item textValue="Report">
        <Alert />
        <Text>Report</Text>
        <Text slot="description">Report an issue/violation.</Text>
      </Item>
    </ComboBox>
  )
};

export const UserProvidedIdAndLabel = {
  name: 'user provided id and label',
  render: (props) => (
    <ComboBox id="test-id" aria-labelledby="test-label" {...props}>
      <Item key="one">Item One</Item>
      <Item key="two" textValue="Item Two">
        <Copy size="S" />
        <Text>Item Two</Text>
      </Item>
      <Item key="three">Item Three</Item>
    </ComboBox>
  ),
  decorator: (Story) => (
    <Flex direction="column" width="size-3000">
      <label id="test-label" htmlFor="test-id">
        Combobox
      </label>
      <Story />
    </Flex>
  )
};

export const MenuTriggerFocus = {
  name: 'menuTrigger: focus',
  args: {menuTrigger: 'focus'}
};

export const MenuTriggerManual = {
  name: 'menuTrigger: manual',
  render: (props) => (
    <ComboBox label="Combobox" menuTrigger="manual" {...props}>
      <Item key="one">Item One</Item>
      <Item key="two" textValue="Item Two">
        <Copy size="S" />
        <Text>Item Two</Text>
      </Item>
      <Item key="three">Item Three</Item>
    </ComboBox>
  ),
  decorator: (Story) => (
    <Flex direction="column">
      <TextField label="Email" />
      <Story />
      <TextField label="Name" />
    </Flex>
  )
};

export const DisabledKeys = {
  name: 'disabled keys',
  render: (props) => (
    <ComboBox
      defaultItems={withSection}
      label="Combobox"
      disabledKeys={['Snake', 'Ross']}
      {...props}>
      {(item) => (
        <Section key={item.name} items={item.children} title={item.name}>
          {(item) => <Item key={item.name}>{item.name}</Item>}
        </Section>
      )}
    </ComboBox>
  )
};

export const IsQuiet = {
  name: 'isQuiet',
  args: {isQuiet: true}
};

export const IsDisabled = {
  name: 'isDisabled',
  args: {isDisabled: true}
};

export const IsReadOnly = {
  name: 'isReadOnly',
  args: {
    isReadOnly: true,
    defaultSelectedKey: 'two'
  }
};

export const LabelPositionTopLabelAlignEnd = {
  name: 'labelPosition: top, labelAlign: end',
  args: {labelAlign: 'end'}
};

export const LabelPositionSide = {
  name: 'labelPosition: side',
  args: {labelPosition: 'side'}
};

export const NoVisibleLabel = {
  name: 'no visible label',
  render: (props) => (
    <ComboBox defaultItems={items} aria-label="ComboBox" {...props}>
      {(item: any) => <Item>{item.name}</Item>}
    </ComboBox>
  )
};

export const NoVisibleLabelIsQuiet = {
  name: 'no visible label, isQuiet',
  render: (props) => (
    <ComboBox defaultItems={items} aria-label="ComboBox" isQuiet {...props}>
      {(item: any) => <Item>{item.name}</Item>}
    </ComboBox>
  )
};

export const WithDescrptionLabelAlignEnd = {
  name: 'with descrption, labelAlign: end',
  args: {
    description: 'Please select your spirit animal.',
    labelAlign: 'end'
  }
};

export const WithErrorMessageLabelPositionSide = {
  name: 'with error message, labelPosition: side',
  args: {
    errorMessage: 'You did not select a valid spirit animal.',
    validationState: 'invalid',
    labelPosition: 'side'
  }
};

export const IsRequired = {
  name: 'isRequired',
  args: {isRequired: true}
};

export const IsRequiredNecessityIndicatorLabel = {
  name: 'isRequired, necessityIndicator: label',
  args: {
    isRequired: true,
    necessityIndicator: 'label'
  }
};

export const ValidationStateInvalid = {
  name: 'validationState: invalid',
  args: {
    validationState: 'invalid',
    defaultSelectedKey: 'two'
  }
};

export const ValidationStateValid = {
  name: 'validationState: valid',
  args: {
    validationState: 'valid',
    defaultSelectedKey: 'two'
  }
};

export const ValidationStateInvalidIsQuiet = {
  name: 'validationState: invalid, isQuiet',
  args: {
    validationState: 'invalid',
    isQuiet: true,
    defaultSelectedKey: 'two'
  }
};

export const ValidationStateValidIsQuiet = {
  name: 'validationState: valid, isQuiet',
  args: {
    validationState: 'valid',
    isQuiet: true,
    defaultSelectedKey: 'two'
  }
};

export const Placeholder = {
  name: 'placeholder',
  args: {
    placeholder: 'Select an item...'
  }
};

export const AutoFocusTrue = {
  name: 'autoFocus: true',
  args: {
    autoFocus: true
  }
};

export const DirectionTop = {
  name: 'direction: top',
  args: {direction: 'top'}
};

export const AllowsCustomValueTrue = {
  name: 'allowsCustomValue: true',
  render: (props) => <CustomValueComboBox allowsCustomValue selectedKey="2" disabledKeys={['3', '6']} {...props} />
};

export const CustomWidth = {
  name: 'customWidth',
  render: (props) => (
    <Flex direction="column">
      <ComboBox label="Combobox" {...props} width="size-500">
        <Item key="one">Item One</Item>
        <Item key="two" textValue="Item Two">
          <Copy size="S" />
          <Text>Item Two</Text>
        </Item>
        <Item key="three">Item Three</Item>
      </ComboBox>
      <ComboBox label="Combobox" {...props} isQuiet width="size-3000">
        <Item key="one">Item One</Item>
        <Item key="two" textValue="Item Two">
          <Copy size="S" />
          <Text>Item Two</Text>
        </Item>
        <Item key="three">Item Three</Item>
      </ComboBox>
      <ComboBox label="Combobox" {...props} width="size-6000">
        <Item key="one">Item One</Item>
        <Item key="two" textValue="Item Two">
          <Copy size="S" />
          <Text>Item Two</Text>
        </Item>
        <Item key="three">Item Three</Item>
      </ComboBox>
    </Flex>
  )
};

export const NoVisibleLabelCustomWidth = {
  name: 'no visible label, customWidth',
  render: (props) => (
    <Flex gap="size-300" direction="column">
      <ComboBox {...props} aria-label="ComboBox" width="size-500">
        <Item key="one">Item One</Item>
        <Item key="two" textValue="Item Two">
          <Copy size="S" />
          <Text>Item Two</Text>
        </Item>
        <Item key="three">Item Three</Item>
      </ComboBox>
      <ComboBox {...props} aria-label="ComboBox" isQuiet width="size-3000">
        <Item key="one">Item One</Item>
        <Item key="two" textValue="Item Two">
          <Copy size="S" />
          <Text>Item Two</Text>
        </Item>
        <Item key="three">Item Three</Item>
      </ComboBox>
      <ComboBox {...props} aria-label="ComboBox" width="size-6000">
        <Item key="one">Item One</Item>
        <Item key="two" textValue="Item Two">
          <Copy size="S" />
          <Text>Item Two</Text>
        </Item>
        <Item key="three">Item Three</Item>
      </ComboBox>
    </Flex>
  )
};

export const Resize = {
  name: 'resize',
  render: (props) => <ResizeCombobox {...props} />,
};

export const InSmallDiv = {
  name: 'in small div',
  render: (props) => (
    <ComboBox aria-label="ComboBox" {...props}>
      <Item key="one">Item One</Item>
      <Item key="two" textValue="Item Two">
        <Copy size="S" />
        <Text>Item Two</Text>
      </Item>
      <Item key="three">Item Three</Item>
    </ComboBox>
  ),
  decorator: (Story) => (
    <Flex width="size-500">
      <Story />
    </Flex>
  )
};

export const InputValueControlled = {
  name: 'inputValue (controlled)',
  render: (props) => <ControlledValueComboBox inputValue="Snake" disabledKeys={['2', '6']} {...props} />
};

export const DefaultInputValueUncontrolled = {
  name: 'defaultInputValue (uncontrolled)',
  args: {
    defaultInputValue: 'Item Three',
    disabledKeys: ['two']
  }
};

export const SelectedKeyControlled = {
  name: 'selectedKey (controlled)',
  render: (props) => <ControlledKeyComboBox selectedKey="4" disabledKeys={['2', '6']} {...props} />
};

export const DefaultSelectedKeyUncontrolled = {
  name: 'defaultSelectedKey (uncontrolled)',
  args: {
    defaultSelectedKey: 'two',
    disabledKeys: ['one']
  }
};

export const InputValueAndSelectedKeyControlled = {
  name: 'inputValue and selectedKey (controlled)',
  render: (props) => (
    <AllControlledComboBox selectedKey="2" inputValue="Kangaroo" disabledKeys={['2', '6']} {...props} />
  )
};

export const InputValueAndSelectedKeyAllowsCustomValueControlled = {
  name: 'inputValue and selectedKey, allowsCustomValue (controlled)',
  render: (props) => (
    <AllControlledComboBox
      selectedKey="2"
      inputValue="Kangaroo"
      disabledKeys={['2', '6']}
      allowsCustomValue
      {...props} />
  )
};

export const DefaultInputValueAndDefaultSelectedKeyUncontrolled = {
  name: 'defaultInputValue and defaultSelectedKey (uncontrolled)',
  args: {
    defaultInputValue: 'Item Two',
    defaultSelectedKey: 'two',
    disabledKeys: ['two']
  }
};

export const InputValueAndDefaultSelectedKeyControlledByInputvalue = {
  name: 'inputValue and defaultSelectedKey (controlled by inputvalue)',
  render: (props) => (
    <ControlledValueComboBox inputValue="K" defaultSelectedKey="2" disabledKeys={['2', '6']} {...props} />
  )
};

export const DefaultInputValueAndSelectedKeyControlledBySelectedKey = {
  name: 'defaultInputValue and selectedKey (controlled by selectedKey)',
  render: (props) => (
    <ControlledKeyComboBox defaultInputValue="Blah" selectedKey="2" disabledKeys={['2', '6']} {...props} />
  )
};

export const CustomFilter = {
  render: () => <CustomFilterComboBox />,
  name: 'custom filter'
};

export const LoadingState = {
  name: 'loadingState',
  render: (props) => <LoadingExamples {...props} />
};

export const LoadingStateLoadingValidationStateInvalid = {
  name: 'loadingState = "loading", validationState: invalid',
  render: (props) => <LoadingExamples validationState="invalid" {...props} />
};

export const LoadingStateLoadingIsQuiet = {
  name: 'loadingState = "loading", isQuiet',
  render: (props) => <LoadingExamples isQuiet {...props} />
};

export const LoadingStateLoadingIsQuietValidationStateInvalid = {
  name: 'loadingState = "loading", isQuiet, validationState: invalid',
  render: (props) => <LoadingExamples isQuiet validationState="invalid" {...props} />
};

export const FilteringWithUseListData = {
  name: 'filtering with useListData',
  render: (props) => <ListDataExample {...props} />
};

export const ServerSideFilteringWithUseAsyncList = {
  name: 'server side filtering with useAsyncList',
  render: (props) => <AsyncLoadingExample {...props} />
};

export const ServerSideFilteringWithUseAsyncListControlledKey = {
  name: 'server side filtering with useAsyncList (controlled key)',
  render: (props) => <AsyncLoadingExampleControlledKey {...props} />
};

export const ServerSideFilteringWithControlledKeyAndInputValueResetIfNotFocused = {
  name: 'server side filtering with controlled key and inputValue reset if not focused',
  render: (props) => <AsyncLoadingExampleControlledKeyWithReset {...props} />
};

export const TwoComboboxes = {
  name: '2 comboboxes',
  render: (props) => (
    <>
      <ComboBox defaultItems={items} label="Combobox1" {...props}>
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>
      <ComboBox defaultItems={items} label="Combobox2" {...props}>
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>
    </>
  ),
  decorator: (Story) => (
    <Flex gap="size-100">
      <Story />
    </Flex>
  )
};

function LoadingExamples(props) {
  return (
    <Flex gap="size-300" direction="column">
      <ComboBox {...props} label="Combobox (loading)" loadingState="loading" defaultItems={items}>
        {(item: any) => <Item>{item.name}</Item>}
      </ComboBox>
      <ComboBox
        {...props}
        label="Combobox (filtering)"
        loadingState="filtering"
        defaultItems={items}>
        {(item: any) => <Item>{item.name}</Item>}
      </ComboBox>
      <ComboBox
        {...props}
        label="Combobox (loading + menuTrigger manual)"
        loadingState="loading"
        menuTrigger="manual"
        defaultItems={items}>
        {(item: any) => <Item>{item.name}</Item>}
      </ComboBox>
      <ComboBox
        {...props}
        label="Combobox (loading more)"
        loadingState="loadingMore"
        defaultItems={items}>
        {(item: any) => <Item>{item.name}</Item>}
      </ComboBox>
    </Flex>
  );
}

function ListDataExample() {
  let {contains} = useFilter({
    sensitivity: 'base'
  });

  let list = useListData({
    initialItems: items,
    initialFilterText: 'Snake',
    filter(item, text) {
      return contains(item.name, text);
    }
  });

  let [showAll, setShowAll] = useState(false);

  return (
    <Flex gap="size-300" direction="column">
      <ComboBox
        onOpenChange={(open, reason) => {
          if (reason === 'manual' && open) {
            setShowAll(true);
          }
        }}
        label="ComboBox (show all on open)"
        items={showAll ? items : list.items}
        inputValue={list.filterText}
        onInputChange={(value) => {
          setShowAll(false);
          list.setFilterText(value);
        }}>
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>
      <ComboBox
        label="ComboBox (default controlled items behavior)"
        items={list.items}
        inputValue={list.filterText}
        onInputChange={list.setFilterText}>
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>
    </Flex>
  );
}

function AsyncLoadingExample(props) {
  interface StarWarsChar {
    name: string,
    url: string
  }

  let list = useAsyncList<StarWarsChar>({
    async load({signal, cursor, filterText}) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, 'https://');
      }

      // Slow down load so progress circle can appear
      await new Promise((resolve) => setTimeout(resolve, 1500));
      let res = await fetch(cursor || `https://swapi.dev/api/people/?search=${filterText}`, {
        signal
      });

      let json = await res.json();

      return {
        items: json.results,
        cursor: json.next
      };
    }
  });
  return (
    <ComboBox
      label="Star Wars Character Lookup"
      items={list.items}
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
      loadingState={list.loadingState}
      onLoadMore={list.loadMore}
      {...props}>
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </ComboBox>
  );
}

function AsyncLoadingExampleControlledKey(props) {
  interface StarWarsChar {
    name: string,
    url: string
  }

  let list = useAsyncList<StarWarsChar>({
    async load({signal, cursor, filterText}) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, 'https://');
      }
      
      // Slow down load so progress circle can appear
      await new Promise((resolve) => setTimeout(resolve, 1500));

      let res = await fetch(cursor || `https://swapi.dev/api/people/?search=${filterText}`, {
        signal
      });

      let json = await res.json();

      return {
        items: json.results,
        cursor: json.next
      };
    },
    initialSelectedKeys: ['Luke Skywalker'],
    getKey: (item) => item.name
  });

  let onSelectionChange = (key) => {
    let itemText = list.getItem(key)?.name;
    list.setSelectedKeys(new Set([key]));
    list.setFilterText(itemText);
  };

  let onInputChange = (value) => {
    if (value === '') {
      list.setSelectedKeys(new Set([null]));
    }
    list.setFilterText(value);
  };

  let selectedKey = (list.selectedKeys as Set<React.Key>).values().next().value;

  return (
    <ComboBox
      label="Star Wars Character Lookup"
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      items={list.items}
      inputValue={list.filterText}
      onInputChange={onInputChange}
      loadingState={list.loadingState}
      onLoadMore={list.loadMore}
      {...props}>
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </ComboBox>
  );
}

function AsyncLoadingExampleControlledKeyWithReset(props) {
  interface StarWarsChar {
    name: string,
    url: string
  }

  let isFocused = useRef(false);

  let list = useAsyncList<StarWarsChar>({
    async load({signal, cursor, filterText, selectedKeys}) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, 'https://');
      }

      // Slow down load so progress circle can appear
      await new Promise((resolve) => setTimeout(resolve, 1500));

      let res = await fetch(cursor || `https://swapi.dev/api/people/?search=${filterText}`, {
        signal
      });

      let json = await res.json();

      let selectedText;
      let selectedKey = (selectedKeys as Set<React.Key>).values().next().value;
      
      // If selectedKey exists and combobox is performing intial load, update the input value with the selected key text
      if (!isFocused.current && selectedKey) {
        let selectedItemName = json.results.find((item) => item.name === selectedKey)?.name;

        if (selectedItemName != null && selectedItemName !== filterText) {
          selectedText = selectedItemName;
        }
      }

      return {
        items: json.results,
        cursor: json.next,
        filterText: selectedText ?? filterText
      };
    },
    initialSelectedKeys: ['Luke Skywalker'],
    getKey: (item) => item.name
  });

  let onSelectionChange = (key) => {
    let itemText = list.getItem(key)?.name;
    list.setSelectedKeys(new Set([key]));
    list.setFilterText(itemText);
  };

  let onInputChange = (value) => {
    if (value === '') {
      list.setSelectedKeys(new Set([null]));
    }
    list.setFilterText(value);
  };

  let selectedKey = (list.selectedKeys as Set<React.Key>).values().next().value;

  return (
    <ComboBox
      onFocusChange={(focus) => (isFocused.current = focus)}
      label="Star Wars Character Lookup"
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      items={list.items}
      inputValue={list.filterText}
      onInputChange={onInputChange}
      loadingState={list.loadingState}
      onLoadMore={list.loadMore}
      {...props}>
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </ComboBox>
  );
}

let customFilterItems = [
  {
    name: 'The first item',
    id: '1'
  },
  {
    name: 'The second item',
    id: '2'
  },
  {
    name: 'The third item',
    id: '3'
  }
];

let CustomFilterComboBox = (props) => {
  let {startsWith} = useFilter({
    sensitivity: 'base'
  });

  let [filterValue, setFilterValue] = React.useState('');

  let filteredItems = React.useMemo(
    () => customFilterItems.filter((item) => startsWith(item.name, filterValue)),
    [props.items, filterValue, startsWith]
  );

  return (
    <ComboBox
      {...props}
      label="Combobox"
      items={filteredItems}
      inputValue={filterValue}
      onInputChange={setFilterValue}>
      {(item: any) => <Item>{item.name}</Item>}
    </ComboBox>
  );
};

function AllControlledComboBox(props) {
  let [fieldState, setFieldState] = React.useState({
    selectedKey: props.selectedKey,
    inputValue: props.inputValue
  });

  let list = useTreeData({
    initialItems: withSection
  });

  let onSelectionChange = (key: React.Key) => {
    setFieldState((prevState) => ({
      inputValue:
        list.getItem(key)?.value.name ?? (props.allowsCustomValue ? prevState.inputValue : ''),
      selectedKey: key
    }));
  };

  let onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === '' ? null : prevState.selectedKey
    }));
  };

  let setSnake = () => {
    setFieldState({
      inputValue: 'Snake',
      selectedKey: '3'
    });
  };

  let setRoss = () => {
    setFieldState({
      inputValue: 'Ross',
      selectedKey: '6'
    });
  };

  let clearAll = () => {
    setFieldState({
      inputValue: '',
      selectedKey: null
    });
  };

  return (
    <div>
      <div>Current selectedKey: {fieldState.selectedKey}</div>
      <div>Current input value: {fieldState.inputValue}</div>
      <ButtonGroup marginEnd="30px">
        <Button variant="secondary" onPress={setSnake}>
          <Text>Snake</Text>
        </Button>
        <Button variant="secondary" onPress={setRoss}>
          <Text>Ross</Text>
        </Button>
        <Button variant="secondary" onPress={clearAll}>
          <Text>Clear key</Text>
        </Button>
      </ButtonGroup>
      <ComboBox
        allowsCustomValue={props.allowsCustomValue}
        disabledKeys={props.disabledKeys}
        selectedKey={fieldState.selectedKey}
        inputValue={fieldState.inputValue}
        defaultItems={list.items}
        label="Combobox"
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
        {...props}>
        {(item) => (
          <Section items={item.children} title={item.value.name}>
            {(item) => <Item>{item.value.name}</Item>}
          </Section>
        )}
      </ComboBox>
    </div>
  );
}

let ControlledKeyComboBox = (props) => {
  let [selectedKey, setSelectedKey] = React.useState(props.selectedKey);

  let onSelectionChange = (key) => {
    setSelectedKey(key);
  };

  let setSnake = () => {
    setSelectedKey('3');
  };

  let setRoss = () => {
    setSelectedKey('6');
  };

  return (
    <div>
      <div>Current selectedKey: {selectedKey}</div>
      <ButtonGroup marginEnd="30px">
        <Button variant="secondary" onPress={setSnake}>
          <Text>Snake</Text>
        </Button>
        <Button variant="secondary" onPress={setRoss}>
          <Text>Ross</Text>
        </Button>
        <Button variant="secondary" onPress={() => setSelectedKey(null)}>
          <Text>Clear key</Text>
        </Button>
      </ButtonGroup>
      <ComboBox
        {...props}
        selectedKey={selectedKey}
        defaultItems={withSection}
        label="Combobox"
        onSelectionChange={onSelectionChange}>
        {(item: any) => (
          <Section items={item.children} title={item.name}>
            {(item: any) => <Item>{item.name}</Item>}
          </Section>
        )}
      </ComboBox>
    </div>
  );
};

let ControlledValueComboBox = (props) => {
  let [value, setValue] = React.useState(props.inputValue);

  let onValueChange = (value) => {
    setValue(value);
  };

  return (
    <div>
      <div>Current input value: {value}</div>
      <ButtonGroup
        marginEnd="30px"
        UNSAFE_style={{
          verticalAlign: 'bottom'
        }}>
        <Button variant="secondary" onPress={() => setValue('Blah')}>
          <Text>Blah</Text>
        </Button>
        <Button variant="secondary" onPress={() => setValue('Kangaroo')}>
          <Text>Kangaroo</Text>
        </Button>
        <Button variant="secondary" onPress={() => setValue('')}>
          <Text>Clear field</Text>
        </Button>
      </ButtonGroup>
      <ComboBox
        {...props}
        inputValue={value}
        defaultItems={withSection}
        label="Combobox"
        onInputChange={onValueChange}>
        {(item: any) => (
          <Section items={item.children} title={item.name}>
            {(item: any) => <Item>{item.name}</Item>}
          </Section>
        )}
      </ComboBox>
    </div>
  );
};

let CustomValueComboBox = (props) => {
  let [selectedKey, setSelectedKey] = React.useState(props.selectedKey);

  let onSelectionChange = (key) => {
    setSelectedKey(key);
  };

  return (
    <div>
      <div>Selected Key: {selectedKey}</div>
      <ComboBox
        {...mergeProps(props, actions)}
        selectedKey={selectedKey}
        defaultItems={withSection}
        label="Combobox"
        onSelectionChange={onSelectionChange}
        marginTop={20}>
        {(item: any) => (
          <Section items={item.children} title={item.name}>
            {(item: any) => <Item>{item.name}</Item>}
          </Section>
        )}
      </ComboBox>
    </div>
  );
};

function ResizeCombobox(props) {
  let [size, setSize] = useState(true);
  return (
    <Flex direction="column" gap="size-200" alignItems="start">
      <div
        style={{
          width: size ? '200px' : '300px'
        }}>
        <ComboBox label="Combobox" {...props} width="100%">
          <Item key="one">Item One</Item>
          <Item key="two" textValue="Item Two">
            <Copy size="S" />
            <Text>Item Two</Text>
          </Item>
          <Item key="three">Item Three</Item>
        </ComboBox>
      </div>
      <ActionButton onPress={() => setSize((prev) => !prev)}>Toggle size</ActionButton>
    </Flex>
  );
}

function ComboBoxWithMap(props) {
  let [items, setItems] = React.useState([
    {
      name: 'The first item',
      id: 'one'
    },
    {
      name: 'The second item',
      id: 'two'
    },
    {
      name: 'The third item',
      id: 'three'
    }
  ]);

  let onClick = () => {
    setItems([
      {
        name: 'The first item new text',
        id: 'one'
      },
      {
        name: 'The second item new text',
        id: 'two'
      },
      {
        name: 'The third item new text',
        id: 'three'
      }
    ]);
  };

  return (
    <Flex direction="column">
      <button onClick={onClick}>Press to change items</button>
      <ComboBox label="Combobox" {...props}>
        {items.map((item) => (
          <Item key={item.id}>{item.name}</Item>
        ))}
      </ComboBox>
    </Flex>
  );
}
