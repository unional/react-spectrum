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
import {ColorSlider} from '../';
import {Flex} from '@react-spectrum/layout';
import {parseColor} from '@react-stately/color';
import React, {useState} from 'react';
import {Text} from '@react-spectrum/text';

export default {
  title: 'ColorSlider',
  component: ColorSlider
};

export const Default = {
  name: 'default',
  args: {defaultValue: "#7f0000", channel: 'red'}
};

export const NoLabelDefaultAriaLabel = {
  name: 'no label, default aria-label',
  args: {label: null}
};

export const NoValueLabel = {
  name: 'no value label',
  args: {showValueLabel: false}
};

export const CustomAriaLabel = {
  name: 'custom aria-label',
  args: {'aria-labe': "Color Picker Channel: Red"}
};

export const Step = {
  name: 'step',
  args: {defaultValue: 'hsl(0, 100%, 50%)', channel: 'hue', step: 72}
};

export const Disabled = {
  name: 'disabled',
  args: {defaultValue: '#333333', channel: 'red', isDisabled: true}
};

export const Vertical = {
  name: 'vertical',
  args: {orientation: 'vertical'}
};

export const Controlled = {
  name: 'controlled'
};

export const CustomWidth = {
  name: 'custom width',
  args: {width: 300}
};

export const CustomHeight = {
  name: 'custom height',
  args: {orientation: 'vertical', height: 300}
};

export const Rgba = {
  name: 'rgba',
  render: (props) => <RGBA {...props} />
};

export const Hsla = {
  name: 'hsla',
  render: (props) => <HSLA {...props} />
};

export const Hsba = {
  name: 'hsba',
  render: (props) => <HSBA {...props} />,
};

function RGBA(props) {
  let [color, setColor] = useState(parseColor('#ff00ff'));
  return (
    <div role="group" aria-label="RGBA Color Picker">
      <Flex gap="size-500" alignItems="center">
        <Flex direction="column">
          <ColorSlider value={color} onChange={setColor} channel={'red'} {...props} />
          <ColorSlider value={color} onChange={setColor} channel={'green'} {...props} />
          <ColorSlider value={color} onChange={setColor} channel={'blue'} {...props} />
          <ColorSlider value={color} onChange={setColor} channel={'alpha'} {...props} />
        </Flex>
        <Flex direction="column" alignItems="center" gap="size-100">
          <div
            style={{
              width: '100px',
              height: '100px',
              background: color.toString('css')
            }} />
          <Text>{color.toString('hexa')}</Text>
        </Flex>
      </Flex>
    </div>
  );
}


function HSLA(props) {
  let [color, setColor] = useState(parseColor('hsla(0, 100%, 50%, 0.5)'));
    return (
      <div role="group" aria-label="HSLA Color Picker">
        <Flex gap="size-500" alignItems="center">
          <Flex direction="column">
            <ColorSlider value={color} onChange={setColor} channel={'hue'} {...props} />
            <ColorSlider value={color} onChange={setColor} channel={'saturation'} {...props} />
            <ColorSlider value={color} onChange={setColor} channel={'lightness'} {...props} />
            <ColorSlider value={color} onChange={setColor} channel={'alpha'} {...props} />
          </Flex>
          <Flex direction="column" alignItems="center" gap="size-100">
            <div
              style={{
                width: '100px',
                height: '100px',
                background: color.toString('css')
              }} />
          </Flex>
        </Flex>
      </div>
    );
}

function HSBA(props) {
  let [color, setColor] = useState(parseColor('hsba(0, 100%, 50%, 0.5)'));
    return (
      <div role="group" aria-label="HSBA Color Picker">
        <Flex gap="size-500" alignItems="center">
          <Flex direction="column">
            <ColorSlider value={color} onChange={setColor} channel={'hue'} {...props} />
            <ColorSlider value={color} onChange={setColor} channel={'saturation'} {...props} />
            <ColorSlider value={color} onChange={setColor} channel={'brightness'} {...props} />
            <ColorSlider value={color} onChange={setColor} channel={'alpha'} {...props} />
          </Flex>
          <Flex direction="column" alignItems="center" gap="size-100">
            <div
              style={{
                width: '100px',
                height: '100px',
                background: color.toString('css')
              }} />
          </Flex>
        </Flex>
      </div>
    );
  }
}
