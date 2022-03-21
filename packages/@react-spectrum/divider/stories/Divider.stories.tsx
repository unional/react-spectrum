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
import {ActionButton} from '@react-spectrum/button/src';
import {Divider} from '../';
import Properties from '@spectrum-icons/workflow/Properties';
import React from 'react';
import Select from '@spectrum-icons/workflow/Select';

export default {
  title: 'Divider',
  component: Divider,
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  }
};

export const LargeDefault = {
  name: 'Large (Default)',
  render: (props) => (
    <section>
      <h1>Large</h1>
      <Divider {...props} />
      <p>Page or Section Titles.</p>
    </section>
  )
};

export const Medium = {
  name: 'Medium',
  render: (props) => (
    <section>
      <h1>Medium</h1>
      <Divider size="M" {...props} />
      <p>Divide subsections, or divide different groups of elements (between panels, rails, etc.)</p>
    </section>
  )
};

export const Small = {
  name: 'Small',
  render: () => (
    <section>
      <h1>Small</h1>
      <Divider size="S" />
      <p>Divide like-elements (tables, tool groups, elements within a panel, etc.)</p>
    </section>
  )
};

export const VerticalLarge = {
  name: 'Vertical, Large (Default)',
  render: (props) => (
    <section
      style={{
        display: 'flex'
      }}>
      <ActionButton aria-label="Properties" isQuiet>
        <Properties />
      </ActionButton>
      <Divider orientation="vertical" {...props} />
      <ActionButton aria-label="Select" isQuiet>
        <Select />
      </ActionButton>
    </section>
  )
};

export const VerticalMedium = {
  ...VerticalLarge,
  name: 'Vertical, Medium',
  args: {size: 'M'}
};

export const VerticalSmall = {
  name: 'Vertical, Small',
  args: {size: 'S'}
};
