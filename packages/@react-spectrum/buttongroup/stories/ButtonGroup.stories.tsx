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
import Bell from '@spectrum-icons/workflow/Bell';
import {Button} from '@react-spectrum/button';
import {ButtonGroup} from '../';
import React, {useState} from 'react';
import {Text} from '@react-spectrum/text';

let Component = (props) => {
  let [show, setShow] = useState(false);
  return (
    <ButtonGroup maxWidth="100vw" {...props}>
      <Button variant="primary" onPress={action('press')}>
        Button 1
      </Button>
      <Button variant="negative" onPress={action('press')}>
        Button long long long name
      </Button>
      <Button variant="primary" isQuiet onPress={action('press')}>
        Quiet button
      </Button>
      <Button variant="primary" isDisabled onPress={action('press')}>
        Disabled button
      </Button>
      <Button variant="secondary" onPress={() => setShow((show) => !show)}>
        <Bell />
        <Text>Click me to make Button larger</Text>
        {show && <Text>to test overflow resizing :D</Text>}
      </Button>
    </ButtonGroup>
  );
};


let ExpandingSibling = (Story) => {
  let [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        width: '1000px',
        overflow: 'hidden',
        padding: '10px',
        backgroundColor: 'var(--spectrum-global-color-gray-50)'
      }}>
      <div
        style={{
          paddingRight: isExpanded ? '200px' : '10px'
        }}>
        <Button variant="secondary" onPress={() => setIsExpanded((prev) => !prev)}>
          {isExpanded ? 'Shrink' : 'Expand'}
        </Button>
      </div>
      <Story />
    </div>
  );
};

export default {
  title: 'ButtonGroup',
  component: Component
};

export const Default = {
  name: 'default'
};

export const IsDisabled = {
  name: 'isDisabled',
  args: {isDisabled: true}
};

export const OrientationVertical = {
  name: 'orientation: vertical',
  args: {orientation: 'vertical'}
};

export const OrientationVerticalAlignEnd = {
  name: 'orientation: vertical, align: end',
  args: {
    orientation: 'vertical',
    align: 'end'
  }
};

export const IsDisabledOrientationVertical = {
  name: 'isDisabled, orientation: vertical',
  args: {
    isDisabled: true,
    orientation: 'vertical'
  }
};

export const AlignEnd = {
  name: 'align: end',
  args: {align: 'end'}
};

export const AlignCenter = {
  name: 'align: center',
  args: {align: 'center'}
};

export const AlignCenterOrientationVertical = {
  name: 'align: center, orientation: vertical',
  args: {
    align: 'center',
    orientation: 'vertical'
  }
};

export const ResizeableContainer = {
  name: 'resizeable container',
  decorator: (Story) => (
    <div
      style={{
        minWidth: '100px',
        padding: '10px',
        resize: 'horizontal',
        overflow: 'auto',
        backgroundColor: 'var(--spectrum-global-color-gray-50)'
      }}>
      <Story />
    </div>
  )
};

export const ConstantContainerChangingSiblings = {
  name: 'constant container, changing siblings',
  decorator: (Story) => <ExpandingSibling story={Story} />
};
