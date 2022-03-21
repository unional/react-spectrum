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
import Add from '@spectrum-icons/workflow/Add';
import {Flex, Text, View} from '@adobe/react-spectrum';
import React from 'react';
import {ToggleButton} from '../';

let actions = {
  onPress: {action: 'press'},
  onChange: {action: 'change'},
};

export default {
  title: 'Button/ToggleButton',
  render: (props) => (
    <Flex gap="size-100">
      <ToggleButton {...props}>
        <Add />
        <Text>Default</Text>
      </ToggleButton>
      <ToggleButton
        defaultSelected
        {...props}>
        <Add />
        <Text>Selected</Text>
      </ToggleButton>
      <ToggleButton defaultSelected isDisabled {...props}>
        <Add />
        <Text>Disabled + selected</Text>
      </ToggleButton>
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

export const Emphasized = {
  name: 'emphasized',
  args: {isEmphasized: true}
};

export const IsQuiet = {
  name: 'isQuiet',
  args: {isQuiet: true}
};

export const IsQuietEmphasized = {
  name: 'isQuiet & emphasized',
  args: {
    isEmphasized: true,
    isQuiet: true
  }
};

export const StaticColorWhite = {
  name: 'staticColor: white',
  decorator: (Story) => (
    <View backgroundColor="static-seafoam-600" padding="size-1000">
      <Flex direction="column" rowGap="size-150">
        <Story staticColor="white" />
        <Story staticColor="white" isQuiet />
      </Flex>
    </View>
  ),
};

export const StaticColorBlack = {
  decorator: (Story) => (
    <View backgroundColor="static-yellow-400" padding="size-1000">
      <Flex direction="column" rowGap="size-150">
        <Story staticColor="black" />
        <Story staticColor="black" isQuiet />
      </Flex>
    </View>
  ),
  name: 'staticColor: black'
};
