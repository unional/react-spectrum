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
import {ActionButton} from '@react-spectrum/button';
import {AlertDialog, DialogTrigger} from '../';
import React from 'react';
import {Text} from '@react-spectrum/text';

let actions = {
  onPrimaryAction: {action: 'primary'},
  onSecondaryAction: {action: 'secondary'},
  onCance: {action: 'cancel'}
};

export default {
  title: 'Dialog/Alert',
  decorator: (Story) => (
    <div
      style={{
        display: 'flex',
        width: 'auto',
        margin: '100px 0'
      }}>
      <Story />
    </div>
  ),
  render: (props) => (
    <DialogTrigger defaultOpen>
      <ActionButton>Trigger</ActionButton>
      <AlertDialog {...props}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique risus. In sit
          amet suscipit lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. In condimentum imperdiet metus non condimentum. Duis eu velit et quam accumsan
          tempus at id velit. Duis elementum elementum purus, id tempus mauris posuere a. Nunc vestibulum
          sapien pellentesque lectus commodo ornare.
        </Text>
      </AlertDialog>
    </DialogTrigger>
  ),
  args: {
    primaryActionLabel: 'Accept',
    cancelLabel: 'Cancel'
  },
  argTypes: {...actions}
};

export const Destructive = {
  name: 'destructive',
  args: {
    variant: 'destructive',
    title: 'Warning Destructive'
  }
};

export const Confirmation = {
  name: 'confirmation',
  args: {
    variant: 'confirmation',
    title: 'Confirmation Required'
  }
};

export const Information = {
  name: 'information',
  args: {
    variant: 'information',
    title: 'Informative Alert'
  }
};

export const Error = {
  name: 'error',
  args: {
    variant: 'error',
    title: 'Error: Danger Will Robinson'
  }
};

export const Warning = {
  name: 'warning',
  args: {
    variant: 'warning',
    title: 'This is a warning'
  }
};

export const PrimaryDisabled = {
  name: 'primary disabled',
  args: {
    variant: 'error',
    title: 'Error: Danger Will Robinson',
    isPrimaryActionDisabled: true
  }
};

export const AutoFocusPrimary = {
  name: 'autoFocus primary',
  args: {
    variant: 'error',
    title: 'Error: Danger Will Robinson',
    secondaryActionLabel: 'Secondary button',
    autoFocusButton: 'primary'
  }
};

export const SecondaryDisabled = {
  name: 'secondary disabled',
  args: {
    variant: 'error',
    title: 'Error: Danger Will Robinson',
    secondaryActionLabel: 'Secondary button',
    isSecondaryActionDisabled: true
  }
};

export const AutoFocusSecondary = {
  name: 'autoFocus secondary',
  args: {
    variant: 'error',
    title: 'Error: Danger Will Robinson',
    secondaryActionLabel: 'Secondary button',
    autoFocusButton: 'secondary'
  }
};

export const AutoFocusCancel = {
  name: 'autoFocus cancel',
  args: {
    variant: 'error',
    title: 'Error: Danger Will Robinson',
    secondaryActionLabel: 'Secondary button',
    autoFocusButton: 'cancel'
  }
};
