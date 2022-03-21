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
import {Breadcrumbs} from '../';

import {Item} from '@react-stately/collections';
import React from 'react';

const CenterDecorator = (storyFn) => (
  <div style={{width: '100vw'}}>
    <div>{storyFn()}</div>
  </div>
);

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
  render: (props) => (
    <Breadcrumbs {...props}>
      <Item key="Folder 1">The quick brown fox jumps over</Item>
      <Item key="Folder 2">My Documents</Item>
      <Item key="Folder 3">Kangaroos jump high</Item>
    </Breadcrumbs>
  ),
  decorators: [CenterDecorator],
  parameters: {
    providerSwitcher: {
      status: 'negative'
    }
  },
  argTypes: {onAction: {action: 'onAction'}}
};

export const DefaultWith3Items = {
  name: 'Default (with 3 items)'
};

export const ManyItems = {
  name: 'Default (with 7 items)',
  render: (props) => (
    <Breadcrumbs {...props}>
      <Item key="Folder 1">The quick brown fox jumps over</Item>
      <Item key="Folder 2">My Documents</Item>
      <Item key="Folder 3">Kangaroos jump high</Item>
      <Item key="Folder 4">Koalas are very cute</Item>
      <Item key="Folder 5">Wombat's noses</Item>
      <Item key="Folder 6">Wattle trees</Item>
      <Item key="Folder 7">April 7</Item>
    </Breadcrumbs>
  )
};

export const IsMultiline = {
  name: 'isMultiline',
  args: {isMultiline: true}
};

export const SizeS = {
  name: 'size: S',
  args: {size: 'S'}
};

export const SizeSIsMultiline = {
  name: 'size: S, isMultiline',
  args: {
    size: 'S',
    isMultiline: true
  }
};

export const SizeM = {
  name: 'size: M',
  args: {size: 'M'}
};

export const SizeMIsMultiline = {
  name: 'size: M, isMultiline',
  args: {
    size: 'M',
    isMultiline: true
  }
};

export const Truncated = {
  name: 'truncated',
  decorator: (Story) => (
    <div style={{width: '120px'}}>
      <Story />
    </div>
  )
};

export const TruncatedIsMultiline = {
  name: 'truncated, isMultiline',
  decorator: (Story) => (
    <div style={{width: '100px'}}>
      <Story />
    </div>
  )
};

export const ManyItemsShowRootTrue = {
  ...ManyItems,
  name: 'many items, showRoot: true',
  args: {showRoot: true}
};

export const ManyItemsIsMultiline = {
  ...ManyItems,
  name: 'many items, isMultiline',
  args: {isMultiline: true}
};

export const ManyItemsIsMultilineShowRootTrue = {
  ...ManyItems,
  name: 'many items, isMultiline, showRoot: true',
  args: {
    maxVisibleItems: 'auto',
    isMultiline: true,
    showRoot: true
  }
};

export const IsDisabledTrue = {
  name: 'isDisabled: true',
  args: {isDisabled: true}
};

export const IsDisabledTrueIsMultiline = {
  ...IsDisabledTrue,
  ...IsMultiline,
  name: 'isDisabled: true, isMultiline'
};

export const Resizeable = {
  ...ManyItems,
  name: 'resizeable',
  decorator: (Story) => (
    <div
      style={{
        minWidth: '100px',
        width: '300px',
        padding: '10px',
        resize: 'horizontal',
        overflow: 'auto',
        backgroundColor: 'var(--spectrum-global-color-gray-50)'
      }}>
      <Story />
    </div>
  )
};

export const OnlyOneItem = {
  name: 'Only one item',
  render: () => (
    <Breadcrumbs>
      <Item>Root</Item>
    </Breadcrumbs>
  )
};

export const OnlyOneItemIsMultiline = {
  name: 'Only one item, isMultiline',
  render: () => (
    <Breadcrumbs isMultiline>
      <Item>Root</Item>
    </Breadcrumbs>
  )
};
