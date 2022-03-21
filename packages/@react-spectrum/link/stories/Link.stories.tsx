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
import {Link} from '../';
import React from 'react';

let actions = {
  onPress: {action: 'press'},
  onPressStart: {action: 'pressstart'},
  onPressEnd: {action: 'pressend'}
};

export default {
  title: 'Link',
  parameters: {
    providerSwitcher: {
      status: 'notice'
    }
  },
  argTypes: {...actions}
};

export const Default = {
  name: 'Default'
};

export const VariantSecondary = {
  name: 'variant: secondary',
  args: {variant: 'secondary'}
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

export const IsQuiet = {
  name: 'isQuiet: true',
  args: {isQuiet: true}
};

export const IsQuietTrueVariantSecondary = {
  ...IsQuiet,
  ...VariantSecondary,
  name: 'isQuiet: true, variant: secondary'
};

export const ChildrenA = {
  render: () =>
    renderWithChildren({
      onPress: action('press'),
      onPressStart: action('pressstart'),
      onPressEnd: action('pressend')
    }),
  name: 'children: a'
};

export const OnPress = {
  render: () =>
    render({
      onPress: action('press'),
      onPressStart: action('pressstart'),
      onPressEnd: action('pressend')
    }),
  name: 'onPress'
};

export const OnClick = {
  render: () =>
    render({
      onClick: action('deprecatedOnClick'),
      onPress: action('press'),
      onPressStart: action('pressstart'),
      onPressEnd: action('pressend')
    }),
  name: 'onClick'
};

function render(props = {}) {
  return <Link {...props}>This is a React Spectrum Link</Link>;
}

function renderWithChildren(props = {}) {
  return (
    <Link {...props}>
      <a href="//example.com" target="_self">
        This is a React Spectrum Link
      </a>
    </Link>
  );
}
