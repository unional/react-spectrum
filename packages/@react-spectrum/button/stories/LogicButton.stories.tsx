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
import {LogicButton} from '../';
import React from 'react';

let actions = {
  onPress: {action: 'press'},
  onPressStart: {action: 'pressstart'},
  onPressEnd: {action: 'pressend'}
};

export default {
  title: 'Button/LogicButton',
  render: (props) => (
    <div>
      <LogicButton {...props}>
        Default
      </LogicButton>
      <LogicButton
        marginStart="10px"
        isDisabled
        {...props}>
        Disabled
      </LogicButton>
    </div>
  ),
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  },
  argTypes: {...actions}
};

export const LogicVariantAnd = {
  name: 'logic variant: and',
  args: {
    variant: 'and',
    label: 'and'
  }
};

export const LogicVariantOr = {
  name: 'logic variant: or',
  args: {
    variant: 'or',
    label: 'or'
  }
};
