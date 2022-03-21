/*
 * Copyright 2021 Adobe. All rights reserved.
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
import React, {useState} from 'react';
import {SpectrumTextFieldProps} from '@react-types/textfield';
import {TextField} from '@react-spectrum/textfield';

export default {
  title: 'HelpText',
  parameters: {
    providerSwitcher: {
      status: 'positive'
    }
  },
  render: (props) => <TextField label="Password" {...props} />
};

export const Description = {
  name: 'description',
  args: {description: 'Password must be at least 8 characters.'}
};

export const ErrorMessage = {
  name: 'error message',
  args: {
    errorMessage: 'Create a password with at least 8 characters.',
    validationState: 'invalid'
  }
};

export const DescriptionAndErrorMessage = {
  name: 'description and error message',
  render: (props) => <DescriptionAndErrorMessageExample {...props} />
};

export const DescriptionValidationStateValid = {
  name: 'description, validationState: valid',
  args: {
    label: 'Nickname',
    description: "Enter your nickname, or leave blank if you don't have one.",
    validationState: 'valid'
  }
};

export const DescriptionAndErrorMessageValidationStateValid = {
  name: 'description and error message, validationState: valid',
  args: {
    label: 'Valid field',
    description: 'The error message will never render because validationState is "valid".',
    errorMessage: 'Uninformative error message',
    // Won't render
    validationState: 'valid'
  }
};

export const Disabled = {
  name: 'disabled',
  args: {
    description: 'Password must be at least 8 characters.',
    isDisabled: true
  }
};

export const LabelAlignEnd = {
  name: 'labelAlign: end',
  args: {
    description: 'Password must be at least 8 characters.',
    labelAlign: 'end'
  }
};

export const LabelPositionSide = {
  name: 'labelPosition: side',
  args: {
    description: 'Password must be at least 8 characters.',
    labelPosition: 'side'
  }
};

export const LabelAlignEndLabelPositionSide = {
  name: 'labelAlign: end, labelPosition: side',
  args: {
    description: 'Password must be at least 8 characters.',
    labelAlign: 'end',
    labelPosition: 'side'
  }
};

export const NoVisibleLabel = {
  name: 'no visible label',
  args: {
    label: null,
    'aria-label': 'Password',
    description: 'Password must be at least 8 characters.'
  }
};

export const NoVisibleLabelLabelPositionSide = {
  name: 'no visible label, labelPosition: side',
  args: {
    label: null,
    'aria-label': 'Password',
    description: 'Password must be at least 8 characters.',
    labelPosition: 'side'
  }
};

export const CustomWidth = {
  name: 'custom width',
  args: {
    label: 'Password',
    description: 'Password must be at least 8 characters.',
    width: '100px'
  }
};

export const CustomWidthLabelPositionSide = {
  name: 'custom width, labelPosition: side',
  args: {
    label: 'Password',
    description: 'Password must be at least 8 characters.',
    width: '440px',
    labelPosition: 'side'
  }
};

export const DescriptionAndCustomDescription = {
  name: 'description and custom description',
  render: (props) => <CustomDescriptionExample {...props} />,
  args: {description: 'Password must be at least 8 characters.'}
};

export const ContainerWithTextAlignmentSet = {
  name: 'container with text alignment set',
  render: () => (
    <Flex
      direction="column"
      gap="size-200"
      UNSAFE_style={{
        textAlign: 'center'
      }}>
      <TextField label="Password" description="Enter a single digit number." />
      <TextField
        label="Password 2"
        errorMessage="Create a password with at least 8 characters."
        validationState="invalid" />
    </Flex>
  )
};

function CustomDescriptionExample(props: SpectrumTextFieldProps = {}) {
  return (
    <Flex direction="column" gap="size-125">
      <TextField label="Password" {...props} aria-describedby="custom-description" />
      <p id="custom-description">Custom description.</p>
    </Flex>
  );
}

function DescriptionAndErrorMessageExample() {
  let [value, setValue] = useState('');
  return (
    <TextField
      label="Empty field"
      description="This input is only valid when it's empty."
      errorMessage="Remove input."
      value={value}
      onChange={setValue}
      validationState={value.length ? 'invalid' : undefined} />
  );
}
