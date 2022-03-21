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
import {ActionButton} from '../';
import Add from '@spectrum-icons/workflow/Add';
import {Flex} from '@react-spectrum/layout';
import React from 'react';
import {Text} from '@react-spectrum/text';
import {View} from '@react-spectrum/view';


let actions = {
  onPress: {action: 'press'},
  onPressStart: {action: 'pressstart'},
  onPressEnd: {action: 'pressend'}
};

export default {
  title: 'Button/ActionButton',
  render: (props) => (
    <Flex gap="size-100">
      <ActionButton {...props}>
        Default
      </ActionButton>
      <ActionButton isDisabled {...props}>
        Disabled
      </ActionButton>
    </Flex>
  ),
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  },
  argTypes: {...actions}
};

export const Default = {
  name: 'default'
};

export const Icon = {
  render: (props) => (
    <Flex gap="size-100">
      <ActionButton {...props}>
        <Add />
        <Text>Default</Text>
      </ActionButton>
      <ActionButton isDisabled {...props}>
        <Text>Disabled</Text>
        <Add />
      </ActionButton>
    </Flex>
  ),
  name: 'icon'
};

export const IconOnly = {
  render: () => (
    <Flex gap="size-100">
      <ActionButton>
        <Add />
      </ActionButton>
      <ActionButton isDisabled>
        <Add />
      </ActionButton>
    </Flex>
  ),
  name: 'icon only'
};

export const IsQuiet = {
  name: 'isQuiet',
  args: {isQuiet: true}
};

export const AutoFocus = {
  name: 'autoFocus',
  args: {autoFocus: true}
};

export const StaticColorWhite = {
  ...Icon,
  name: 'staticColor: white',
  decorator: (Story) => (
    <View backgroundColor="static-seafoam-600" padding="size-1000">
      <Flex direction="column" rowGap="size-150">
        <Story staticColor="white" />
        <Story staticColor="white" isQuiet />
      </Flex>
    </View>
  )
};

export const StaticColorBlack = {
  ...Icon,
  name: 'staticColor: black',
  decorator: (Story) => (
    <View backgroundColor="static-seafoam-600" padding="size-1000">
      <Flex direction="column" rowGap="size-150">
        <Story staticColor="black" />
        <Story staticColor="black" isQuiet />
      </Flex>
    </View>
  )
};
