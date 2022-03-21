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
import React from 'react';
import {View} from '@react-spectrum/view';

let baseColors = [
  'celery',
  'chartreuse',
  'yellow',
  'magenta',
  'fuchsia',
  'purple',
  'indigo',
  'seafoam',
  'red',
  'orange',
  'green',
  'blue'
];
let colors = [];
for (let color of baseColors) {
  for (let i = 4; i <= 7; i++) {
    colors.push(`${color}-${i}00`);
  }
}

export default {
  title: 'Flex',
  component: Flex,
  render: (props) => (
    <Flex gap="size-100" direction="row" {...props}>
      <View backgroundColor="celery-600" width="size-800" />
      <View backgroundColor="blue-600" width="size-800" />
      <View backgroundColor="magenta-600" width="size-800" />
    </Flex>
  ),
};

export const VerticalStackWithGap = {
  name: 'Vertical stack with gap',
  args: {
    direction: 'column',
    width: 'size-2000'
  }
};

export const HorizontalStackWithGap = {
  name: 'Horizontal stack with gap',
  args: {height: 'size-800'}
};

export const WrappingWithGap = {
  name: 'Wrapping with gap',
  render: (props) => (
    <View maxWidth="80%" borderWidth="thin" borderColor="dark">
      <Flex direction="row" gap="size-100" wrap {...props}>
        {colors.map((color) => (
          <View key={color} backgroundColor={color} width="size-800" height="size-800" />
        ))}
      </Flex>
    </View>
  )
};

export const NestedFlexWithGap = {
  name: 'Nested flex with gap',
  render: () => (
    <Flex direction="column" gap="size-150">
      <View backgroundColor="celery-600" height="size-800" />
      <Flex direction="row" height="size-800" gap="size-100">
        <View backgroundColor="indigo-600" width="size-800" />
        <View backgroundColor="seafoam-600" width="size-800" />
        <View backgroundColor="blue-600" width="size-800" />
      </Flex>
      <View backgroundColor="magenta-600" height="size-800" />
    </Flex>
  )
};

export const AlignCenter = {
  name: 'Align center',
  args: {
    direction: 'row',
    alignItems: 'center'
  }
};

export const AlignEnd = {
  name: 'Align end',
  args: {alignItems: 'end'}
};

export const JustifyStart = {
  name: 'Justify start',
  args: {
    justifyContent: 'start',
    width: '80%'
  }
};

export const JustifyCenter = {
  name: 'Justify center',
  args: {
    justifyContent: 'center',
    width: '80%'
  }
};

export const JustifyEnd = {
  name: 'Justify end',
  args: {
    justifyContent: 'end',
    width: '80%'
  }
};

export const JustifySpaceAround = {
  name: 'Justify space-around',
  args: {
    justifyContent: 'space-around',
    width: '80%'
  }
};

export const JustifySpaceBetween = {
  name: 'Justify space-between',
  args: {
    justifyContent: 'space-between',
    width: '80%'
  }
};

export const JustifySpaceEvenly = {
  name: 'Justify space-evenly',
  args: {
    justifyContent: 'space-evenly',
    width: '80%'
  }
};

export const Ordered = {
  name: 'ordered',
  args: {
    justifyContent: 'space-evenly',
    width: '80%'
  }
};

export const Responsive = {
  name: 'responsive',
  render: () => (
    <Flex
      direction={{
        base: 'column',
        L: 'row'
      }}
      gap={{
        base: 'size-100',
        M: 'size-250',
        L: 'size-350'
      }}>
      <View backgroundColor="celery-600" width="size-800" height="size-800" />
      <View backgroundColor="blue-600" width="size-800" height="size-800" />
      <View backgroundColor="magenta-600" width="size-800" height="size-800" />
    </Flex>
  )
};
