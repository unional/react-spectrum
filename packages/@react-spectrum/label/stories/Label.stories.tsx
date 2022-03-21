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
import {Label} from '../';
import React from 'react';
import {TextField} from '@react-spectrum/textfield';

export default {
  title: 'Label',
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  },
  render: (props) => (
    <div
      style={{
        whiteSpace: 'nowrap'
      }}>
      <Label {...props} for="test">
        Test
      </Label>
      <TextField placeholder="React" id="test" isRequired={props.isRequired} />
    </div>
  )
};

export const Default = {
  name: 'default'
};

export const LabelAlignStart = {
  name: 'labelAlign: start',
  args: {
    labelAlign: 'start',
    width: '100%'
  }
};

export const LabelAlignEnd = {
  name: 'labelAlign: end',
  args: {
    labelAlign: 'end',
    width: '100%'
  }
};

export const LabelPositionSideLabelAlignStart = {
  name: 'labelPosition: side, labelAlign: start',
  args: {
    labelPosition: 'side',
    labelAlign: 'start',
    width: 80
  }
};

export const LabelPositionSideLabelAlignEnd = {
  name: 'labelPosition: side, labelAlign: end',
  args: {
    labelPosition: 'side',
    labelAlign: 'end',
    width: 80
  }
};

export const IsRequired = {
  name: 'isRequired',
  args: {
    isRequired: true
  }
};

export const NecessityIndicatorIcon = {
  name: 'necessityIndicator: icon',
  args: {
    isRequired: true,
    necessityIndicator: 'icon'
  }
};

export const NecessityIndicatorLabel = {
  name: 'necessityIndicator: label',
  args: {
    isRequired: true,
    necessityIndicator: 'label'
  }
};

export const IsRequiredFalseNecessityIndicatorLabel = {
  name: 'isRequired: false, necessityIndicator: label',
  args: {
    isRequired: false,
    necessityIndicator: 'label'
  }
};
