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
import {Color} from '@react-types/color';
import {ColorField} from '../';
import {Flex} from '@react-spectrum/layout';
import React, {useState} from 'react';
import {useId} from '@react-aria/utils';
import {View} from '@react-spectrum/view';
import {VisuallyHidden} from '@react-aria/visually-hidden';

export default {
  title: 'ColorField',
  component: ColorField
};

export const Default = {
  name: 'default'
};

export const DefaultValue = {
  name: 'has default value',
  args: {defaultValue: '#abcdef'}
};

export const Value = {
  name: 'value',
  args: {value: '#FF00AA'},
  argTypes: {onChange: {action: 'change'}}
};

export const IsQuiet = {
  name: 'isQuiet',
  args: {isQuiet: true}
};

export const IsReadOnly = {
  ...DefaultValue,
  name: 'isReadOnly',
  args: {isReadOnly: true}
};

export const IsDisabled = {
  ...DefaultValue,
  name: 'isDisabled',
  args: {isDisabled: true}
};

export const ValidationStateValid = {
  name: 'validationState valid',
  args: {validationState: 'valid'}
};

export const ValidationStateInvalid = {
  name: 'validationState invalid',
  args: {validationState: 'invalid'}
};

export const RequiredLabelOptional = {
  name: 'required, label, optional',
  decorator: (Story) => (
    <Flex direction="column" gap="size-100">
      <Story isRequired />
      <Story isRequired necessityIndicator="label" />
      <Story necessityIndicator="label" />
    </Flex>
  )
};

export const WithPlaceholder = {
  name: 'with placeholder',
  args: {placeholder: 'Enter a hex color'}
};

export const Step16 = {
  name: 'step = 16',
  args: {step: 16}
};

export const ControlledValue = {
  render: () => <ControlledColorField value="#FF00AA" />,
  name: 'controlled value'
};

export const Autofocus = {
  name: 'autofocus',
  args: {autoFocus: true}
};

export const Placeholder = {
  name: 'placeholder',
  args: {placeholder: '#e73623'}
};

export const LabelSide = {
  name: 'label side',
  args: {labelPosition: 'side'}
};

export const NoVisibleLabel = {
  name: 'no visible label',
  args: {
    isRequired: true,
    'aria-label': 'Primary Color'
  }
};

export const AriaLabelledby = {
  ...NoVisibleLabel,
  decorator: (Story) => (
    <>
      <label htmlFor="colorfield" id="label">
        Primary Color
      </label>
      <Story isRequired id="colorfield" aria-labelledby="label" />
    </>
  ),
  name: 'aria-labelledby'
};

export const CustomWidth = {
  name: 'custom width',
  args: {width: 'size-3000'}
};

export const CustomWidthNoVisibleLabel = {
  ...NoVisibleLabel,
  name: 'custom width no visible label',
  args: {
    width: 'size-3000',
    isRequired: true,
    'aria-label': 'Primary Color'
  }
};

export const CustomWidthLabelPositionSide = {
  name: 'custom width, labelPosition=side',
  args: {
    width: 'size-3000',
    labelPosition: 'side'
  }
};

export const CustomWidth10PxForMinWidth = {
  name: 'custom width, 10px for min-width',
  decorator: (Story) => (
    <Flex direction="column" gap="size-100">
      <Story width="10px" />
      <div style={{width: '10px'}}>
        <Story width="10px" />
      </div>
    </Flex>
  ),
};

function ControlledColorField(props: any = {}) {
  let [color, setColor] = useState(props.value || null);

  let onChange = (color: Color) => {
    setColor(color);

    if (props.onChange) {
      props.onChange(color);
    }
  };

  let style = color
    ? {
      backgroundColor: color.toString('rgb')
    }
    : {};
  let id = useId();
  return (
    <Flex direction="row" gap="size-100" alignItems="end">
      <ColorField id={id} label="Primary Color" onChange={onChange} value={color} />
      <View width="size-400" height="size-400" UNSAFE_style={style}>
        <VisuallyHidden>
          <output htmlFor={id} aria-live="off">
            {color ? color.toString('hex') : ''}
          </output>
        </VisuallyHidden>
      </View>
    </Flex>
  );
}
