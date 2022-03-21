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
import {Button} from '../';
import {Flex} from '@react-spectrum/layout';
import React from 'react';
import {Text} from '@react-spectrum/text';

let actions = {
  onPress: {action: 'press'},
  onPressStart: {action: 'pressstart'},
  onPressEnd: {action: 'pressend'}
};

export default {
  title: 'Button',
  render: (props) => (
    <Flex gap="size-200">
      <Button {...props}>
        Default
      </Button>
      <Button isDisabled {...props}>
        Disabled
      </Button>
      {props.variant !== 'cta' && (
        <Button
          onPress={action('press')}
          onPressStart={action('pressstart')}
          onPressEnd={action('pressend')}
          isQuiet
          {...props}>
          Quiet
        </Button>
      )}
    </Flex>
  ),
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  },
  argTypes: {...actions}
};

export const VariantCta = {
  name: 'variant: cta',
  args: {variant: 'cta'}
};

export const WithIcon = {
  render: (props) => (
    <Flex gap="size-200">
      <Button
        variant="primary"
        {...props}>
        <Bell />
        <Text>Default</Text>
      </Button>
      <Button
        isDisabled
        variant="primary"
        {...props}>
        <Text>Disabled</Text>
        <Bell />
      </Button>
      <Button
        isQuiet
        variant="primary"
        {...props}>
        <Bell />
        <Text>Quiet</Text>
      </Button>
    </Flex>
  ),
  name: 'with icon'
};

export const VariantOverBackground = {
  name: 'variant: overBackground',
  decorator: (Story) => (
    <div
      style={{
        backgroundColor: 'rgb(15, 121, 125)',
        color: 'rgb(15, 121, 125)',
        padding: '15px 20px',
        display: 'inline-block'
      }}>
      <Story />
    </div>
  ),
  args: {variant: 'overBackground'}
};

export const VariantPrimary = {
  name: 'variant: primary',
  args: {variant: 'primary'}
};

export const VariantSecondary = {
  name: 'variant: secondary',
  args: {variant: 'secondary'}
};

export const VariantNegative = {
  name: 'variant: negative',
  args: {variant: 'negative'}
};

export const ElementA = {
  name: 'element: a',
  args: {
    elementType: 'a',
    variant: 'primary'
  }
};

export const ElementAHrefExampleComTargetSelf = {
  name: "element: a, href: '//example.com', target: '_self'",
  args: {
    elementType: 'a',
    href: '//example.com',
    target: '_self',
    variant: 'primary'
  }
};

export const ElementARelNoopenerNoreferrer = {
  name: "element: a, rel: 'noopener noreferrer'",
  args: {
    elementType: 'a',
    href: '//example.com',
    rel: 'noopener noreferrer',
    variant: 'primary'
  }
};
