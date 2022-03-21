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
import AlignCenter from '@spectrum-icons/workflow/AlignCenter';
import AlignLeft from '@spectrum-icons/workflow/AlignLeft';
import AlignRight from '@spectrum-icons/workflow/AlignRight';
import Copy from '@spectrum-icons/workflow/Copy';
import Cut from '@spectrum-icons/workflow/Cut';
import {Flex} from '@react-spectrum/layout';
import {Item, Picker, Section} from '../';
import Paste from '@spectrum-icons/workflow/Paste';
import React, {useState} from 'react';
import {Text} from '@react-spectrum/text';
import {useAsyncList} from '@react-stately/data';
import {View} from '@react-spectrum/view';

let flatOptions = [
  {
    id: 1,
    name: 'Aardvark'
  },
  {
    id: 2,
    name: 'Kangaroo'
  },
  {
    id: 3,
    name: 'Snake'
  },
  {
    id: 4,
    name: 'Danni'
  },
  {
    id: 5,
    name: 'Devon'
  },
  {
    id: 6,
    name: 'Ross'
  },
  {
    id: 7,
    name: 'Puppy'
  },
  {
    id: 8,
    name: 'Doggo'
  },
  {
    id: 9,
    name: 'Floof'
  }
];

let withSection = [
  {
    name: 'Animals',
    children: [
      {
        name: 'Aardvark'
      },
      {
        name: 'Kangaroo'
      },
      {
        name: 'Snake'
      }
    ]
  },
  {
    name: 'People',
    children: [
      {
        name: 'Danni'
      },
      {
        name: 'Devon'
      },
      {
        name: 'Ross'
      }
    ]
  }
];

export default {
  title: 'Picker'
};

export const Default = {
  render: () => (
    <Picker label="Test" onSelectionChange={action('selectionChange')}>
      <Item key="rarely">Short</Item>
      <Item key="sometimes">Normal</Item>
      <Item key="always">This item is very long and word wraps poorly</Item>
    </Picker>
  ),
  name: 'default'
};

export const Sections = {
  render: () => (
    <Picker label="Test" onSelectionChange={action('selectionChange')}>
      <Section title="Animals">
        <Item key="Aardvark">Aardvark</Item>
        <Item key="Kangaroo">Kangaroo</Item>
        <Item key="Snake">Snake</Item>
      </Section>
      <Section title="People">
        <Item key="Danni">Danni</Item>
        <Item key="Devon">Devon</Item>
        <Item key="Ross">Ross</Item>
      </Section>
    </Picker>
  ),
  name: 'sections'
};

export const Dynamic = {
  render: () => (
    <Picker label="Test" items={flatOptions} onSelectionChange={action('selectionChange')}>
      {(item) => <Item>{item.name}</Item>}
    </Picker>
  ),
  name: 'dynamic'
};

export const DynamicWithSections = {
  render: () => (
    <Picker label="Test" items={withSection} onSelectionChange={action('selectionChange')}>
      {(item) => (
        <Section key={item.name} items={item.children} title={item.name}>
          {(item) => <Item key={item.name}>{item.name}</Item>}
        </Section>
      )}
    </Picker>
  ),
  name: 'dynamic with sections'
};

export const IsDisabled = {
  render: () => (
    <Picker label="Test" isDisabled onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isDisabled'
};

export const IsDisabledSelectedKey = {
  render: () => (
    <Picker label="Test" isDisabled selectedKey="One" onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isDisabled, selectedKey'
};

export const LabelAlignEnd = {
  render: () => (
    <Picker
      direction="top"
      label="Test"
      labelAlign="end"
      onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'labelAlign: end'
};

export const LabelPositionSide = {
  render: () => (
    <Picker label="Test" labelPosition="side" onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'labelPosition: side'
};

export const IsRequired = {
  render: () => (
    <Picker label="Test" isRequired onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isRequired'
};

export const IsRequiredNecessityIndicatorLabel = {
  render: () => (
    <Picker
      label="Test"
      isRequired
      necessityIndicator="label"
      onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isRequired, necessityIndicator: label'
};

export const OptionalNecessityIndicatorLabel = {
  render: () => (
    <Picker label="Test" necessityIndicator="label" onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'optional, necessityIndicator: label'
};

export const ValidationStateInvalid = {
  render: () => (
    <Picker label="Test" validationState="invalid" onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'validationState: invalid'
};

export const IsQuiet = {
  render: () => (
    <Picker isQuiet label="Test" onSelectionChange={action('selectionChange')}>
      <Item key="100">One hundred</Item>
      <Item key="2012">Two thousand and twelve</Item>
      <Item key="3">Three</Item>
    </Picker>
  ),
  name: 'isQuiet'
};

export const IsQuietIsDisabled = {
  render: () => (
    <Picker label="Test" isQuiet isDisabled onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two million">Two million</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isQuiet, isDisabled'
};

export const IsQuietLabelAlignEnd = {
  render: () => (
    <Picker label="Test" isQuiet labelAlign="end" onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="two">Two dollary-doos</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isQuiet, labelAlign: end'
};

export const IsQuietLabelPositionSide = {
  render: () => (
    <Picker label="Test" isQuiet labelPosition="side" onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isQuiet, labelPosition: side'
};

export const IsQuietIsRequired = {
  render: () => (
    <Picker label="Test" isQuiet isRequired onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isQuiet, isRequired'
};

export const IsQuietIsRequiredNecessityIndicatorLabel = {
  render: () => (
    <Picker
      label="Test"
      isQuiet
      isRequired
      necessityIndicator="label"
      onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isQuiet, isRequired, necessityIndicator: label'
};

export const IsQuietOptionalNecessityIndicatorLabel = {
  render: () => (
    <Picker
      label="Test"
      isQuiet
      necessityIndicator="label"
      onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isQuiet, optional, necessityIndicator: label'
};

export const IsQuietValidationStateInvalid = {
  render: () => (
    <Picker
      label="Test"
      isQuiet
      validationState="invalid"
      onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'isQuiet, validationState: invalid'
};

export const ComplexItems = {
  render: () => (
    <Picker label="Test" onSelectionChange={action('selectionChange')}>
      <Section title="Section 1">
        <Item textValue="Copy">
          <Copy />
          <Text>Copy</Text>
        </Item>
        <Item textValue="Cut">
          <Cut />
          <Text>Cut</Text>
        </Item>
        <Item textValue="Paste">
          <Paste />
          <Text>Paste</Text>
        </Item>
      </Section>
      <Section title="Section 2">
        <Item textValue="Puppy">
          <AlignLeft />
          <Text>Puppy</Text>
          <Text slot="description">Puppy description super long as well geez</Text>
        </Item>
        <Item textValue="Doggo with really really really long long long text">
          <AlignCenter />
          <Text>Doggo with really really really long long long text</Text>
        </Item>
        <Item textValue="Floof">
          <AlignRight />
          <Text>Floof</Text>
        </Item>
      </Section>
    </Picker>
  ),
  name: 'complex items'
};

export const LongItemText = {
  render: () => (
    <Picker label="Test" onSelectionChange={action('selectionChange')}>
      <Item key="short">One</Item>
      <Item key="long">your text here long long long long</Item>
      <Item key="underscores">your_text_here_long_long_long_long</Item>
      <Item key="hyphens">your-text-here-long-long-long-long</Item>
      <Item key="singleWord">supercalifragilisticexpialidocious</Item>
      <Item key="always">This item is very long and word wraps poorly</Item>
    </Picker>
  ),
  name: 'long item text'
};

export const FalsyItemKey = {
  render: () => (
    <Picker label="Test" onSelectionChange={action('selectionChange')}>
      <Item key="">None</Item>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'falsy item key'
};

export const NoVisibleLabel = {
  render: () => (
    <Picker aria-label="Test" onSelectionChange={action('selectionChange')}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Picker>
  ),
  name: 'no visible label'
};

export const WithDescription = {
  render: () => (
    <Picker
      label="Test"
      description="Please select an item."
      onSelectionChange={action('selectionChange')}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Picker>
  ),
  name: 'with description'
};

export const WithErrorMessage = {
  render: () => (
    <Picker
      label="Test"
      errorMessage="Please select a valid item."
      validationState="invalid"
      onSelectionChange={action('selectionChange')}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Picker>
  ),
  name: 'with error message'
};

export const IsQuietNoVisibleLabel = {
  render: () => (
    <Picker aria-label="Test" isQuiet onSelectionChange={action('selectionChange')}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Picker>
  ),
  name: 'isQuiet, no visible label'
};

export const IsQuietAlignEnd = {
  render: () => (
    <Picker aria-label="Test" isQuiet align="end" onSelectionChange={action('selectionChange')}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Picker>
  ),
  name: 'isQuiet, align: end'
};

export const CustomWidths = {
  render: () => (
    <Flex direction="column">
      <Picker label="Test" width="size-1200" onSelectionChange={action('selectionChange')}>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Picker>
      <Picker label="Test" width="size-6000" onSelectionChange={action('selectionChange')}>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Picker>
    </Flex>
  ),
  name: 'custom widths'
};

export const CustomWidthsLabelPositionSide = {
  render: () => (
    <Flex direction="column">
      <Picker
        label="Test"
        width="size-1200"
        labelPosition="side"
        onSelectionChange={action('selectionChange')}>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Picker>
      <Picker
        label="Test"
        width="size-6000"
        labelPosition="side"
        onSelectionChange={action('selectionChange')}>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Picker>
    </Flex>
  ),
  name: 'custom widths, labelPosition: side'
};

export const CustomMenuWidths = {
  render: () => (
    <Flex direction="column">
      <Picker label="Test" menuWidth="size-1000" onSelectionChange={action('selectionChange')}>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Picker>
      <Picker label="Test" menuWidth="size-6000" onSelectionChange={action('selectionChange')}>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Picker>
    </Flex>
  ),
  name: 'custom menu widths'
};

export const CustomMenuWidthsIsQuiet = {
  render: () => (
    <Flex direction="column">
      <Picker
        label="Test"
        menuWidth="size-400"
        isQuiet
        onSelectionChange={action('selectionChange')}>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Picker>
      <Picker
        label="Test"
        menuWidth="size-6000"
        isQuiet
        onSelectionChange={action('selectionChange')}>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Picker>
    </Flex>
  ),
  name: 'custom menu widths, isQuiet'
};

export const CustomMenuWidthAlignEnd = {
  render: () => (
    <Picker
      label="Test"
      menuWidth="size-6000"
      align="end"
      onSelectionChange={action('selectionChange')}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Picker>
  ),
  name: 'custom menu width, align: end'
};

export const IsOpenControlled = {
  render: () => (
    <Picker
      label="Test"
      isOpen
      onOpenChange={action('onOpenChange')}
      onSelectionChange={action('selectionChange')}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Picker>
  ),
  name: 'isOpen (controlled)'
};

export const DefaultOpenUncontrolled = {
  render: () => (
    <Picker
      label="Test"
      defaultOpen
      onOpenChange={action('onOpenChange')}
      onSelectionChange={action('selectionChange')}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Picker>
  ),
  name: 'defaultOpen (uncontrolled)'
};

export const SelectedKeyControlled = {
  render: () => (
    <Picker label="Test" selectedKey="One" onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'selectedKey (controlled)'
};

export const DefaultSelectedKeyUncontrolled = {
  render: () => (
    <Picker label="Test" defaultSelectedKey="One" onSelectionChange={action('selectionChange')}>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'defaultSelectedKey (uncontrolled)'
};

export const PickerClosesOnBlur = {
  render: () => (
    <>
      <div
        style={{
          display: 'flex',
          width: 'auto',
          margin: '250px 0'
        }}>
        <input placeholder="Shift tab here" />
        <Picker label="Test" defaultSelectedKey="One" onSelectionChange={action('selectionChange')}>
          <Item key="One">One</Item>
          <Item key="Two">Two</Item>
          <Item key="Three">Three</Item>
        </Picker>
        <input placeholder="Tab here" />
      </div>
    </>
  ),
  name: 'picker closes on blur'
};

export const IsLoading = {
  render: () => (
    <Picker label="Test" isLoading items={[]}>
      {(item) => <Item>{item.name}</Item>}
    </Picker>
  ),
  name: 'isLoading'
};

export const IsLoadingIsQuiet = {
  render: () => (
    <Picker label="Test" isLoading isQuiet items={[]}>
      {(item) => <Item>{item.name}</Item>}
    </Picker>
  ),
  name: 'isLoading, isQuiet'
};

export const IsLoadingMore = {
  render: () => (
    <Picker label="Test" isLoading items={flatOptions}>
      {(item) => <Item>{item.name}</Item>}
    </Picker>
  ),
  name: 'isLoading more'
};

export const AsyncLoading = {
  render: () => <AsyncLoadingExample />,
  name: 'async loading'
};

export const Focus = {
  render: () => (
    <div
      style={{
        display: 'flex',
        width: 'auto',
        margin: '250px 0'
      }}>
      <input placeholder="Shift tab here" />
      <Picker
        label="Focus-Test"
        items={flatOptions}
        autoFocus
        onFocus={action('focus')}
        onBlur={action('blur')}
        onKeyDown={action('keydown')}
        onKeyUp={action('keyup')}>
        {(item) => <Item>{item.name}</Item>}
      </Picker>
      <input placeholder="Tab here" />
    </div>
  ),
  name: 'focus'
};

export const Resize = {
  render: () => <ResizePicker />,
  name: 'resize'
};

export const Autofocus = {
  render: () => (
    <Picker label="Test" autoFocus>
      <Item key="One">One</Item>
      <Item key="Two">Two</Item>
      <Item key="Three">Three</Item>
    </Picker>
  ),
  name: 'autofocus'
};

export const ScrollingContainer = {
  render: () => (
    <View width="300px" height="size-500" overflow="auto">
      <View width="500px">
        <Picker label="Test" autoFocus>
          <Item key="One">One</Item>
          <Item key="Two">Two</Item>
          <Item key="Three">Three</Item>
        </Picker>
      </View>
    </View>
  ),
  name: 'scrolling container'
};

function AsyncLoadingExample() {
  interface Pokemon {
    name: string,
    url: string
  }
  let list = useAsyncList<Pokemon>({
    async load({signal, cursor}) {
      let res = await fetch(cursor || 'https://pokeapi.co/api/v2/pokemon', {
        signal
      });
      let json = await res.json(); // The API is too fast sometimes, so make it take longer so we can see the spinner

      await new Promise((resolve) => setTimeout(resolve, cursor ? 500 : 1000));
      return {
        items: json.results,
        cursor: json.next
      };
    }
  });
  return (
    <Picker
      label="Pick a Pokemon"
      items={list.items}
      isLoading={list.isLoading}
      onLoadMore={list.loadMore}>
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </Picker>
  );
}

function ResizePicker() {
  const [state, setState] = useState(true);
  return (
    <Flex direction="column" gap="size-200" alignItems="start">
      <div
        style={{
          width: state ? '200px' : '300px'
        }}>
        <Picker label="Choose A" width="100%">
          <Item key="rarely">A1</Item>
          <Item key="sometimes">A2</Item>
          <Item key="always">A3</Item>
        </Picker>
      </div>
      <ActionButton onPress={() => setState(!state)}>Toggle size</ActionButton>
    </Flex>
  );
}
